// routes here are only accessible by admin

import express from "express";

const router = express.Router();

import controller from "../controllers/admin.controller.js";

import {
  ensureAuthenticated,
  restrictToRole,
} from "../middlewares/auth.middleware.js";

const adminRestrictMiddleware = restrictToRole("ADMIN");

// This is clean when you have 5–20 admin routes
// All routes in this file are automatically admin-only
router.use(ensureAuthenticated);
router.use(adminRestrictMiddleware);

// Returns all the Users
router.get("/users", controller.allUsers);

export default router;
