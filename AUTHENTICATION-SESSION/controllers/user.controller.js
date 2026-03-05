import { error } from "node:console";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if email already exists
    const [existingUser] = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where((table) => eq(table.email, email));

    if (existingUser) {
      return res.status(400).json({ error: `Email ${email} already taken` });
    }

    // 2. Create salt + hash password
    const salt = randomBytes(256).toString("hex");

    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    // 3. Insert new user and return only the id
    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: usersTable.id });

    // 4. Send success response
    return res.status(201).json({ status: "success", userId: user.id }); // ← this is the auto-generated UUID
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error: "Internal server error",
    });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
      name: usersTable.name,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser) {
    return res
      .status(404)
      .json({ error: `User with email ${email} doesnot exists` });
  }

  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHash) {
    return res.status(400).json({ error: "Incorrect Password " });
  }

  // we will create a token instead of using session
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };

  // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  // Now this token can be returned to the user back.
  return res.json({ status: "success", token });
};

export const currentPage = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "You are Not Logged In" });
  }

  return res.json({ user });
};

export const updatePage = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "You are Not Logged In" });
  }

  const { name } = req.body;
  await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id));

  return res.json({ status: "success" });
};

export default {
  signUp,
  logIn,
  currentPage,
  updatePage,
};
