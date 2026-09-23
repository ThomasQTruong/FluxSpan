import { DottyBeams } from "@/components/backgrounds/DottyBeams";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialAuth } from "@/components/auth/SocialAuth";

export function SignUpPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <AuthCard>
        {/* Auth title. */}
        <div className="text-2xl sm:text-4xl mb-4 sm:mb-8">
          <span className="font-bold">Sign Up</span>
        </div>

        {/* Social auth option(s). */}
        <SocialAuth />

      </AuthCard>
    </DottyBeams>
  );
}
