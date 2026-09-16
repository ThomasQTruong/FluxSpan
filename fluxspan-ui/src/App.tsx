import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { Navbar } from "@/components/Navbar";
// import { Beams } from "@/components/backgrounds/Beams";
import { DottyBeams } from "@/components/backgrounds/DottyBeams";

function App() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <DashboardGrid className="h-216 px-8"></DashboardGrid>
    </DottyBeams>
  );
}

export default App;
