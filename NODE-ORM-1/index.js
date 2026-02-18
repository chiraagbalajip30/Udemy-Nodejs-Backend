require("dotenv/config");
const db = require("./db/index");
const { usersTable } = require("./drizzle/schema");

// dotenv.config(); //tries to read the dotenv file before everything else

async function getAllUsers() {
  const users = await db.select().from(usersTable);
  console.log(`Users in DB`, users);
  return users;
}

async function createUser({ id, name, email }) {
  await db.insert(usersTable).values({ id, name, email });
}

// createUser({ id: 1, name: "MCB", email: "mcb@123.com" });
// createUser({ id: 2, name: "P", email: "p@123.com" });

getAllUsers(); // Output is an Object because Drizzle is doing that.
