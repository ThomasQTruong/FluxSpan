import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { Navbar } from "@/components/Navbar";
import { DottyBeams } from "@/components/backgrounds/DottyBeams";

export function DashboardPage() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <div className="w-full flex flex-col h-screen lg:h-[calc(100dvh-5rem)]">
        <DashboardGrid className="pb-8 px-8 h-512 lg:flex-1" />
      </div>
    </DottyBeams>
  );
}
