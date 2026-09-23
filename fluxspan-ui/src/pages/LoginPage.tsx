import { DottyBeams } from "@/components/backgrounds/DottyBeams";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";

export function LoginPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <AuthCard>
        { /* Auth title. */ }
        <div className="text-2xl sm:text-4xl mb-4 sm:mb-8">
          <span className="font-bold">Sign In</span>
        </div>

        { /* Login form option. */ }
        <LoginForm />

        { /* Social auth option(s). */ }
        <SocialAuth />

        { /* Auth card footer (sign up). */ }
        <AuthCardFooter message="Don't have an account?" linkMessage="Sign Up instead."
                        link="/signup" />
      </AuthCard>
    </DottyBeams>
  );
}