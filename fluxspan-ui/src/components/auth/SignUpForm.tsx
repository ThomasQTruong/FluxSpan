import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';

// Define the validation schema outside the component to prevent recreation on re-renders.
const signUpSchema = z
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
type signUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  // Initialize the form with the Zod resolver.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // The submit handler only runs if validation passes.
  const onSubmit = async (data: signUpFormValues) => {
    // 'data' is 100% type-safe here. Ready to send to the FluxSpan backend.
    console.log('SignUp data', data);

    // Example: await fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
    >
      {/* Email/Password inputs. */}
      <div className="flex w-full flex-col gap-2 sm:gap-4">
        {/* Email. */}
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            {...register('email')} // Connects the input to React Hook Form.
            type="text"
            id="email"
            className={cn(
              'w-full rounded-md border p-2 transition-colors duration-300 ease-in-out outline-none hover:bg-gray-100 focus:ring-1',
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black focus:ring-gray-500'
            )}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password. */}
        <div>
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            autoComplete="new-password"
            className={cn(
              'w-full rounded-md border p-2 transition-colors duration-300 ease-in-out outline-none hover:bg-gray-100 focus:ring-1',
              errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black focus:ring-gray-500'
            )}
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm password. */}
        <div>
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            className={cn(
              'w-full rounded-md border p-2 transition-colors duration-300 ease-in-out outline-none hover:bg-gray-100 focus:ring-1',
              errors.confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black focus:ring-gray-500'
            )}
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit button. */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  );
}
