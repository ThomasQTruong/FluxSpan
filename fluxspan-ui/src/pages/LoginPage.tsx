import { DottyBeams } from "@/components/backgrounds/DottyBeams";
import { Navbar } from "@/components/Navbar";
import { AuthForm } from "@/components/auth/AuthForm";

export function LoginPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <AuthForm />
    </DottyBeams>
  );
}