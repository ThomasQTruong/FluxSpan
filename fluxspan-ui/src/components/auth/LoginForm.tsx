import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address.' }),
  password: z.string().min(1, 'Password is required.'),
  rememberMe: z.boolean(),
});

type loginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: loginFormValues) => {
    try {
      console.log('Login data', data);
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
    >
      {/* Email/Password inputs. */}
      <div className="flex w-full flex-col gap-2 sm:gap-4">
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            {...register('email')}
            type="text"
            id="email"
            className={cn(
              'w-full rounded-md border p-2 transition-colors duration-300 ease-in-out outline-none focus:ring-1',
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-black focus:ring-gray-500'
            )}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>
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
      </div>
      {/* RememberMe and Forgot Password options. */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <input
            {...register('rememberMe')}
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4"
          />
          <label htmlFor="rememberMe" className="text-xs sm:text-sm">
            Stay Signed In
          </label>
        </div>
        <Link
          to="./"
          className="text-xs underline transition-colors duration-300 ease-in-out hover:text-cyan-500 sm:text-sm"
        >
          Forgot Password?
        </Link>
      </div>
      {/* Submit button. */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
      >
        {isSubmitting ? 'Logging In...' : 'Log In'}
      </button>
    </form>
  );
}
