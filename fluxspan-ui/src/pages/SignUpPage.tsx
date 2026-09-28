import { Card, CardFooter, SignUpForm, SocialAuth } from '@/features/auth';

export function SignUpPage() {
  return (
    <Card>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Sign Up</span>
      </div>

      {/* Sign Up form option. */}
      <SignUpForm />

      {/* Social auth option(s). */}
      <SocialAuth message="Or Sign Up With:" />

      {/* Auth card footer (sign in). */}
      <CardFooter
        message="Already have an account?"
        linkMessage="Sign In instead."
        link="/login"
      />
    </Card>
  );
}
