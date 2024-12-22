import { z } from "zod";

export const addNoteSchema = z.object({
  title: z.string().min(1),
  body: z.string(),
});
