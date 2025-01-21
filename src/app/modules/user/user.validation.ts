import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .optional(),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

const updatePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, 'Old password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters')
      .max(20, 'Password too long'),
  }),
});

export const userValidation = {
  updateUserValidationSchema,
  updatePasswordValidationSchema,
};
