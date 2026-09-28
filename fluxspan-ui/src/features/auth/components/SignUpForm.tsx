import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpFormValues } from '../schemas';
import { EmailField } from './EmailField';
import { NewPasswordFields } from './NewPasswordFields';

export function SignUpForm() {
  // Initialize the form with the Zod resolver.
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // The submit handler only runs if validation passes.
  const onSubmit = async (data: SignUpFormValues) => {
    // 'data' is 100% type-safe here. Ready to send to the FluxSpan backend.
    console.log('SignUp data', data);

    // Example: await fetch('/api/signup', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12"
      >
        {/* Email/Password inputs. */}
        <div className="flex w-full flex-col gap-2 sm:gap-4">
          {/* Email. */}
          <EmailField />

          <NewPasswordFields />
        </div>

        {/* Submit button. */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </FormProvider>
  );
}
