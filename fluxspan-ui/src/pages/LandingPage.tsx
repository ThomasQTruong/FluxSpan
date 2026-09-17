import { Aurora } from "@/components/backgrounds/Aurora";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";

export function LandingPage() {
  return (
    <Aurora>
      <Navbar logoClassName="fill-slate-100" linkClassName="text-slate-100"></Navbar>
      <div className="text-slate-100 text-4xl w-screen h-screen flex justify-center items-center">
        <Logo className="w-screen h-screen p-16 md:p-32 lg:p-64 flex" textClassName="fill-slate-100"></Logo>
      </div>
    </Aurora>
  );
}
