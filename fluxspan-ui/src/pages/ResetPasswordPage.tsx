import { AuthCard, AuthCardFooter, ResetPasswordForm } from '@/features/auth';

export function ResetPasswordPage() {
  return (
    <AuthCard>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Reset Password</span>
      </div>

      {/* Reset password form. */}
      <ResetPasswordForm />

      {/* Card footer. */}
      <AuthCardFooter message="" linkMessage="Back to Login." link="/login" />
    </AuthCard>
  );
}
