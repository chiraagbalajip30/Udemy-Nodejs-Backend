import { db } from "../src/db/index.js";
import { usersTable } from "../src/models/user.model.js";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return existingUser;
}
