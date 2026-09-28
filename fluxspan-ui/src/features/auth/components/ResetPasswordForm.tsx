import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas';
import { NewPasswordFields } from './NewPasswordFields';

export function ResetPasswordForm() {
  const methods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      console.log('Reset Password data', data);
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Invalid password. Please try again.',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
      >
        <NewPasswordFields />

        {/* Submit button. */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
        >
          {isSubmitting ? 'Reset...' : 'Reset'}
        </button>
      </form>
    </FormProvider>
  );
}
