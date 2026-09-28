import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface PasswordFormField {
  password: string;
}

export function PasswordField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PasswordFormField>();

  return (
    <div className="w-full">
      <label htmlFor="password" className="text-sm">
        Password
      </label>
      <input
        {...register('password')}
        type="password"
        id="password"
        autoComplete="current-password"
        className={cn(
          'w-full rounded-md border p-2 transition-colors duration-300 ease-in-out outline-none hover:bg-gray-100 focus:ring-1',
          errors.password
            ? 'border-red-500 focus:ring-red-500'
            : 'border-black focus:ring-gray-500'
        )}
      />
      {errors.password && (
        <span className="text-xs text-red-500">{errors.password.message}</span>
      )}
    </div>
  );
}
