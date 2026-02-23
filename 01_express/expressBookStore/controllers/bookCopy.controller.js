const booksTable = require("../models/book.model");
const db = require("../db/index");

exports.getAllBooks = function (req, res) {
  // res.setHeader('x-bd', 'mcb'); // manually fixing the header
  res.json(BOOKS);
};

exports.getBookById = function (req, res) {
  const id = parseInt(req.params.id);
  const book = BOOKS.find((e) => e.id === id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `Id must be of type number` });
  }

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  } else {
    return res.json(book);
  }
};

exports.createBook = (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "") {
    return res.status(400).json({ error: `Title is required` });
  }

  if (!author || author === "") {
    return res.status(400).json({ error: `Author is required` });
  }

  const id = BOOKS.length + 1;

  const book = { id, title, author };
  BOOKS.push(book);

  return res.status(201).json({ message: `Book created success: ${id}` });
};

exports.deleteBookById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `id must be of type number` });
  }

  const indexToDelete = BOOKS.findIndex((e) => e.id === id);

  if (indexToDelete < 0) {
    return res.status(400).json({ error: `Book with id ${id} does not exist` });
  } else {
    BOOKS.splice(indexToDelete, 1);
    return res.status(200).json({ message: `Book Deleted` });
  }
};
