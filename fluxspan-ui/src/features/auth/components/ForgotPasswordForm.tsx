import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schemas';
import { EmailField } from './EmailField';

export function ForgotPasswordForm() {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      console.log('Forgot Password data', data);
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Invalid email Please try again.',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
      >
        {/* Email input. */}
        <EmailField />

        {/* Submit button. */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </FormProvider>
  );
}
