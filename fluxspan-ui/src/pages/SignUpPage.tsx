import { AuthCard } from '@/components/auth/AuthCard';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { AuthCardFooter } from '@/components/auth/AuthCardFooter';

export function SignUpPage() {
  return (
    <AuthCard>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Sign Up</span>
      </div>

      {/* Sign Up form option. */}
      <SignUpForm />

      {/* Social auth option(s). */}
      <SocialAuth message="Or Sign Up With:" />

      {/* Auth card footer (sign in). */}
      <AuthCardFooter
        message="Already have an account?"
        linkMessage="Sign In instead."
        link="/login"
      />
    </AuthCard>
  );
}
