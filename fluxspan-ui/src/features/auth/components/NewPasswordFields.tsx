import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface NewPasswordFieldsProps {
  className?: string;
}

interface NewPasswordFormFields {
  password: string;
  confirmPassword: string;
}

export function NewPasswordFields({ className }: NewPasswordFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewPasswordFormFields>();

  return (
    <div className={cn('flex w-full flex-col gap-2 sm:gap-4', className)}>
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
    </div>
  );
}
