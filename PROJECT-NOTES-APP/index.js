import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT ?? 8000;

// CORS (must be before routes)
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
// Middleware
app.use(express.json());
app.use(authenticationMiddleware);

// Routes
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running.." });
});

app.use("/user", userRouter);
app.use("/notes", notesRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
