import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    author: z
      .string()
      .min(24, 'Invalid author ID')
      .max(24, 'Invalid author ID'),
    isPublished: z.boolean().optional(),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
};
