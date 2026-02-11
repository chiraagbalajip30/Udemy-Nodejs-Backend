const express = require("express");
const fs = require("node:fs");

const app = express();
const PORT = 8000;

// In Memory Database - Rule Violation
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

// Middlewares(Plugins)
app.use(express.json());
// so now we have the body

// just writing middleware to log the paths along with time like we used to do in earlier codes
app.use(function (req, res, next) {
  const log = `\n[${Date.now()}]: ${req.method} ${req.path}`;
  fs.appendFileSync("logs.txt", log, "utf-8");
  next();
});

// Writing our own Middleware
app.use(function (req, res, next) {
  console.log("I am Middleware A");
  next();
});

// another middleware
app.use(function (req, res, next) {
  console.log("I am Middleware B");
  next();
});

// Routes
app.get("/books", (req, res) => {
  // res.setHeader('x-bd', 'mcb'); // manually fixing the header
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((e) => e.id === id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `Id must be of type number` });
  }

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  } else {
    return res.json(book);
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "") {
    return res.status(400).json({ error: `Title is required` });
  }

  if (!author || author === "") {
    return res.status(400).json({ error: `Author is required` });
  }

  const id = books.length + 1;

  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: `Book created success: ${id}` });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: `id must be of type number` });
  }

  const indexToDelete = books.findIndex((e) => e.id === id);

  if (indexToDelete < 0) {
    return res.status(400).json({ error: `Book with id ${id} does not exist` });
  } else {
    books.splice(indexToDelete, 1);
    return res.status(200).json({ message: `Book Deleted` });
  }
});

app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});
