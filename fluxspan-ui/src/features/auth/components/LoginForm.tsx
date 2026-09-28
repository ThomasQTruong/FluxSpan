import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { loginSchema, type LoginFormValues } from '../schemas';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';
import { SubmitButton } from './SubmitButton';

export function LoginForm() {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { register, handleSubmit, setError } = methods;

  const onSubmit = async (data: LoginFormValues) => {
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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
      >
        {/* Email/Password inputs. */}
        <div className="flex w-full flex-col gap-2 sm:gap-4">
          <EmailField />
          <PasswordField />
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
            to="/forgot-password"
            className="text-xs underline transition-colors duration-300 ease-in-out hover:text-cyan-500 sm:text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        {/* Submit button. */}
        <SubmitButton text="Log In" onClickText="Logging In..." />
      </form>
    </FormProvider>
  );
}
