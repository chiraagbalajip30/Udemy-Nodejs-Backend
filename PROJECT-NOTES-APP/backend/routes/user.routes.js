import express from "express";
import { db } from "../src/db/index.js";
import { usersTable } from "../src/models/user.model.js";
import { eq } from "drizzle-orm";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validation/request.validation.js";
import { findUserByEmail } from "../services/user.service.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { createUserToken } from "../utils/token.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", ensureAuthenticated, async (req, res) => {
  return res.json({ user: req.user });
});

router.post("/signup", async (req, res) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: validationResult.error.issues,
      });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with Email ${email} already exists` });
    }
    const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

    const [user] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({ data: { userId: user.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
      req.body,
    );
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { email, password } = validationResult.data;

    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ error: `User with Email ${email} does not exists` });
    }
    const { password: hashedPassword } = hashPasswordWithSalt(
      password,
      user.salt,
    );

    if (user.password !== hashedPassword) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const token = await createUserToken({ id: user.id });

    return res.status(200).json({ data: { token } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
