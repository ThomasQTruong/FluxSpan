import { Card, CardFooter, ResetPasswordForm } from '@/features/auth';

export function ResetPasswordPage() {
  return (
    <Card>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Reset Password</span>
      </div>

      {/* Reset password form. */}
      <ResetPasswordForm />

      {/* Card footer. */}
      <CardFooter message="" linkMessage="Back to Login." link="/login" />
    </Card>
  );
}
