import { z } from 'zod';

const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

export const noteSchema = z.object({
  title: z.string().min(2).max(30),
  content: z.string(),
  linkUrl: z.string().regex(urlRegex).optional()
});

export type NoteInputData = z.infer<typeof noteSchema>;
