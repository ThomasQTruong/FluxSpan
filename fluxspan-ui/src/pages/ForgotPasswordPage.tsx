import { AuthCard, AuthCardFooter, ForgotPasswordForm } from '@/features/auth';

export function ForgotPasswordPage() {
  return (
    <AuthCard>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Forgot Password</span>
      </div>

      {/* Forgot-Password form. */}
      <ForgotPasswordForm />

      {/* Card footer. */}
      <AuthCardFooter message="" linkMessage="Back to Login." link="/login" />
    </AuthCard>
  );
}
