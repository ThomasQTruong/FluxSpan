import { z } from 'zod';

// =============================================================================
// Reusable Field Definitions
// =============================================================================
const emailSchema = z.email({ error: 'Please enter a valid email address.' });

const passwordPolicySchema = z
  .string()
  .min(10, 'Password must be at least 10 characters long.')
  .max(128, 'Password cannot exceed 128 characters.');

// Check if confirmPassword matches password.
const passwordsMatch = (data: { password: string; confirmPassword: string }) =>
  data.password === data.confirmPassword;

const passwordMatchConfig = {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
};

// -----------------------------------------------------------------------------
// Sign Up Schema & Types
// -----------------------------------------------------------------------------
// Define the validation schema outside the component to prevent recreation on re-renders.
export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordPolicySchema,
    confirmPassword: z.string(),
  })
  .refine(passwordsMatch, passwordMatchConfig);

// Automatically infer the TypeScript type from the Zod schema.
export type SignUpFormValues = z.infer<typeof signUpSchema>;

// -----------------------------------------------------------------------------
// Login Schema & Types
// -----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// -----------------------------------------------------------------------------
// Forgot-Password Schema & Types
// -----------------------------------------------------------------------------
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// -----------------------------------------------------------------------------
// Reset-Password Schema & Types
// -----------------------------------------------------------------------------
export const resetPasswordSchema = z
  .object({
    password: passwordPolicySchema,
    confirmPassword: z.string(),
  })
  .refine(passwordsMatch, passwordMatchConfig);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
