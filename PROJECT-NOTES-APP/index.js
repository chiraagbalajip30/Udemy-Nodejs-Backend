import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

const PORT = process.env.PORT ?? 8000;

// Middleware
app.use(express.json());
app.use(authenticationMiddleware);
app.use("/notes", notesRouter);

// Routes
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running.." });
});

app.use("/user", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
