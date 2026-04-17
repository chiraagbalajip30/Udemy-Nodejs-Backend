import { z } from "zod";

export const createNotesSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
});

export const updateNotesSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
});