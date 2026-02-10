const express = require("express");

const app = express();
const PORT = 8000;

// In Memory Database - Rule Violation
const books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

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


app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});
