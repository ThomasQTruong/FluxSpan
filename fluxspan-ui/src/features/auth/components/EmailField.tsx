import { useFormContext } from 'react-hook-form';
import { cn } from '@/utils';

interface EmailFormField {
  email: string;
}

export function EmailField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailFormField>();

  return (
    <div className="w-full">
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
  );
}
