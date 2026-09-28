import { Card, CardFooter, LoginForm, SocialAuth } from '@/features/auth';

export function LoginPage() {
  return (
    <Card>
      {/* Auth title. */}
      <div className="mb-4 text-2xl sm:mb-8 sm:text-4xl">
        <span className="font-bold">Sign In</span>
      </div>

      {/* Login form option. */}
      <LoginForm />

      {/* Social auth option(s). */}
      <SocialAuth message="Or Sign In With:" />

      {/* Auth card footer (sign up). */}
      <CardFooter
        message="Don't have an account?"
        linkMessage="Sign Up instead."
        link="/signup"
      />
    </Card>
  );
}
