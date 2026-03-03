import express from "express";

import controller from "../controllers/user.controller.js";

const router = express.Router();

// Returns current logged in User
router.get("/", controller.currentPage);

// Signup
router.post("/signup", controller.signUp);

// Login Route
router.post("/login", controller.logIn);

export default router;
