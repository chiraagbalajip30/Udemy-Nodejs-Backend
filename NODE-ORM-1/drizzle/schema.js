const { pgTable, integer, varchar } = require("drizzle-orm/pg-core");

const usersTable = pgTable("users", {
  id: integer().primaryKey(),
  name: varchar({ length: 25 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// exporting an object so written within {}
module.exports = {
  usersTable,
};
