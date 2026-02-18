// This file is used when you need to send the data
// // Used for Connection Establishment to the database, or receive it.
// You can log here if you have some errors or issues.

const { drizzle } = require("drizzle-orm/node-postgres");

// const db = drizzle(process.env.DATABASE_URL!); this is the syntax in docs
// postgress://<username>:<password>@<host>:<port>/<db_name> //  pattern to be followed
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
