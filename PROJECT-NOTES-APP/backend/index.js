import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 8000;

// =========================
// ✅ CORS
// =========================
app.use(cors());

// =========================
// ✅ Middleware
// =========================
app.use(express.json());

// =========================
// ✅ Public Routes
// =========================
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and running.." });
});

app.use("/user", userRouter); // login/signup (NO auth)

// =========================
// 🔐 Protected Routes
// =========================
app.use("/notes", authenticationMiddleware, notesRouter);

// =========================
// 🚀 Start Server
// =========================
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
