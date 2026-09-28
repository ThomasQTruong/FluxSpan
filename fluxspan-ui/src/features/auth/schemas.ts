import { z } from 'zod';

// -----------------------------------------------------------------------------
// Sign Up Schema & Types
// -----------------------------------------------------------------------------
// Define the validation schema outside the component to prevent recreation on re-renders.
export const signUpSchema = z
  .object({
    email: z.email({ error: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(10, 'Password must be at least 10 characters long.')
      .max(128, 'Password cannot exceed 128 characters.'),
    confirmPassword: z.string(),
  })
  // Check if confirmPassword matches password.
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

// Automatically infer the TypeScript type from the Zod schema.
export type SignUpFormValues = z.infer<typeof signUpSchema>;

// -----------------------------------------------------------------------------
// Login Schema & Types
// -----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address.' }),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
