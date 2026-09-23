import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { Navbar } from '@/components/Navbar';
import { DottyBeams } from '@/components/backgrounds/DottyBeams';

export function DashboardPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <div className="flex h-screen w-full flex-col lg:h-[calc(100dvh-5rem)]">
        <DashboardGrid className="h-512 px-8 pb-8 lg:flex-1" />
      </div>
    </DottyBeams>
  );
}
