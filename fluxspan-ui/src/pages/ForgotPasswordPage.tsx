import { Card, CardFooter, ForgotPasswordForm } from '@/features/auth';

export function ForgotPasswordPage() {
  return (
    <Card>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Forgot Password</span>
      </div>

      {/* Forgot-Password form. */}
      <ForgotPasswordForm />

      {/* Card footer. */}
      <CardFooter message="" linkMessage="Back to Login." link="/login" />
    </Card>
  );
}
