import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";

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

export const logIn = async (req, res) => {};

export const currentPage = async (req, res) => {};

export default {
  signUp,
  logIn,
  currentPage,
};
