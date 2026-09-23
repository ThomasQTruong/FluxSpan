import { DottyBeams } from "@/components/backgrounds/DottyBeams";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { AuthCardFooter } from "@/components/auth/AuthCardFooter";

export function SignUpPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <AuthCard>
        { /* Auth title. */ }
        <div className="text-2xl sm:text-4xl mb-4 sm:mb-8">
          <span className="font-bold">Sign Up</span>
        </div>

        { /* Sign Up form option. */ }
        <SignUpForm />

        { /* Social auth option(s). */ }
        <SocialAuth message="Or Sign Up With:" />

        { /* Auth card footer (sign in). */ }
        <AuthCardFooter message="Already have an account?" linkMessage="Sign In instead."
                        link="/login"
        />
      </AuthCard>
    </DottyBeams>
  );
}
