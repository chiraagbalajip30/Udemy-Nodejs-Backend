import { error } from "node:console";
import db from "../db/index.js ";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";

export const allUsers = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res
    //     .status(401)
    //     .json({ error: "You must be Authenticated to access this!" });
    // }

    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable);

    return res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      error: "Internal server error",
    });
  }
};

export default {
  allUsers,
};
