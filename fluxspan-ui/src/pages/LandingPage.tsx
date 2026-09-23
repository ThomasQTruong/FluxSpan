import { Aurora } from '@/components/backgrounds/Aurora';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';

export function LandingPage() {
  return (
    <Aurora>
      <Navbar logoClassName="fill-slate-100" linkClassName="text-slate-100" />
      <div className="flex h-screen w-screen items-center justify-center text-4xl text-slate-100">
        <Logo
          className="flex h-screen w-screen p-16 md:p-32 lg:p-64"
          textClassName="fill-slate-100"
        />
      </div>
    </Aurora>
  );
}
