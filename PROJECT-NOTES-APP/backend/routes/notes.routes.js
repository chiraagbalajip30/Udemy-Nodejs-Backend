import express from "express";
import { eq, and } from "drizzle-orm";

import { db } from "../src/db/index.js";
import { notesTable } from "../src/models/note.model.js";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createNotesSchema,
  updateNotesSchema,
} from "../validation/note.validation.js";

const router = express.Router();

// Create Note
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const validationResult = await createNotesSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.format(),
      });
    }
    const { title, content } = validationResult.data;
    const userId = req.user.id;

    const [note] = await db
      .insert(notesTable)
      .values({
        title,
        content,
        userId,
      })
      .returning();

    return res.status(201).json({
      message: "Note Created Successfully",
      data: note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// GET ALL NOTES (for logged-in user)
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.userId, userId));

    return res.json({
      data: notes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// DELETE NOTE
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    // Ensure Note belongs to User
    const [note] = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, noteId));

    if (!note || note.userId !== userId) {
      return res.status(404).json({
        error: "Note not Found",
      });
    }
    await db.delete(notesTable).where(eq(notesTable.id, noteId));

    return res.json({
      message: "Note Deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// UPDATE NOTE
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const validationResult = await updateNotesSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.format(),
      });
    }

    const noteId = req.params.id;
    const userId = req.user.id;

    const updateData = validationResult.data;

    // Prevent empty update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "At least one field (title or content) is required",
      });
    }

    const [updatedNote] = await db
      .update(notesTable)
      .set(updateData)
      .where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
      .returning();

    if (!updatedNote) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    return res.json({
      message: "Note updated",
      data: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
