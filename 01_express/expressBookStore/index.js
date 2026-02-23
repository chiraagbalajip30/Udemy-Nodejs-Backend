// Code Before using Drizzle ORm


// const express = require("express");

// const bookRouter = require("./routes/book.routes");
// const { loggerMiddleware } = require("./middlewares/logger");

// const app = express();
// const PORT = 8000;

// // In Memory Database - Rule Violation
// // The array or the data have been moved to book.js file within db folder, and will be imported in book.routes.js file as it is used there.

// // Middlewares(Plugins)
// app.use(express.json());
// // so now we have the body
// app.use(loggerMiddleware);

// // Routes are moved to books.routes.js file from here. Now we will import that and use it here.
// app.use("/books", bookRouter);

// // Listen
// app.listen(PORT, () => {
//   console.log(`Your server is running on port: ${PORT}`);
// });




// Code after using Drizzle-ORm


const express = require("express");
require("dotenv/config");

const bookRouter = require("./routes/book.routes");
const { loggerMiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 8000;



app.use(express.json());

app.use(loggerMiddleware);


app.use("/books", bookRouter);


app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});

