const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Home Page");
});

app.get("/contact-us", (req, res) => {
  res.end("You can contact me at mcb@gmail.com and 3258461239");
});

app.get("/tweets", (req, res) => {
  res.end("Here are your tweets");
});

app.post("/tweets", (req, res) => {
  res.status(201).end("TWeet Created Successfully");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
