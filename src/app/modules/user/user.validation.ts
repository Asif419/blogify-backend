import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
      .string({ invalid_type_error: 'Password must be string' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
  role: z.enum(['admin', 'user']),
  isBlocked: z.boolean().optional(),
});

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
  createUserValidationSchema,
  updateUserValidationSchema,
  updatePasswordValidationSchema,
};
