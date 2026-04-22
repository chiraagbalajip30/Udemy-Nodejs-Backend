import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const notesTable = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 200 }).notNull(),
  content: text("content"),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
