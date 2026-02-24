const authorsTable = require("../models/author.model");
const booksTable = require("../models/book.model");
const db = require("../db/index");
const { sql } = require("drizzle-orm");
const { eq, ilike } = require("drizzle-orm");

exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};

exports.getAuthorById = async (req, res) => {
  const id = req.params.id;

  const [author] = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id))
    .limit(1);

  if (!author) {
    return res.status(404).json({ error: `Author with ${id} Does Not Exist` });
  } else {
    return res.json(author);
  }
};

exports.createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorsTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorsTable.id });

  return res
    .status(201)
    .json({ message: `Author created success`, id: result.id });
};

exports.getBooksOfAuthor = async (req, res) => {
  const id = req.params.id;
  const books = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, id));

  return res.json(books);
};

exports.deleteAuthorById = async (req, res) => {
  const id = req.params.id;
};
