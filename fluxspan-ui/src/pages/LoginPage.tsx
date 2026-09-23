import { DottyBeams } from "@/components/backgrounds/DottyBeams";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <AuthCard>
        {/* Auth title. */}
        <div className="text-2xl sm:text-4xl mb-4 sm:mb-8">
          <span className="font-bold">Sign In</span>
        </div>

        {/* Login form option. */}
        <LoginForm />

        {/* Social auth option(s). */}
        <SocialAuth />

        <hr className="w-full border-gray-300 mt-2 mdt:m-4" />

        {/* Sign Up option. */}
        <div className="w-full flex flex-row justify-center items-center gap-1 p-3">
          <span className="text-xs sm:text-sm">Don't have an account?</span>
          <Link to="./" className="text-xs sm:text-sm underline text-cyan-500 hover:text-cyan-600
                  transition-colors duration-300 ease-in-out">
            Sign Up instead.
          </Link>
        </div>
      </AuthCard>
    </DottyBeams>
  );
}