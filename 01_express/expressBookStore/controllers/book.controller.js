const booksTable = require("../models/book.model");
const db = require("../db/index");
const { sql } = require("drizzle-orm");
const { eq, ilike } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search;

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      .where(
        sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`,
      );

    return res.json(books);
  }

  console.log({ search });
  const books = await db.select().from(booksTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;
  const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  } else {
    return res.json(book);
  }
};

exports.createBook = async (req, res) => {
  const { title, description, authorId } = req.body;

  if (!title || title === "") {
    return res.status(400).json({ error: `Title is required` });
  }

  const [result] = await db
    .insert(booksTable)
    .values({ title, description, authorId })
    .returning({ id: booksTable.id });

  return res
    .status(201)
    .json({ message: `Book created success`, id: result.id });
};

exports.deleteBookById = async (req, res) => {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: `Book Deleted` });
};
