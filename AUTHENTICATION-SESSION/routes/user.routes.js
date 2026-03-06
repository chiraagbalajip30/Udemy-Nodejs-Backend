import express from "express";

import controller from "../controllers/user.controller.js";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Returns current logged in User
router.get("/", ensureAuthenticated, controller.currentPage);

// Patch Route
router.patch("/", ensureAuthenticated, controller.updatePage);

// Signup
router.post("/signup", controller.signUp);

// Login Route
router.post("/login", controller.logIn);

export default router;
