import DashboardGrid from './components/dashboard/DashboardGrid';
import Navbar from './components/Navbar';
// import Beams from './components/backgrounds/Beams';
import DottyBeams from './components/backgrounds/DottyBeams';

function App() {
  return (
    <DottyBeams className="bg-slate-200">
      { /* <div className="bg-slate-50 min-h-screen bg-[radial-gradient(var(--color-slate-300)_1px,transparent_1px)] [background-size:24px_24px]"> */}
      <Navbar />
      <DashboardGrid />
      { /* </div> */}
    </DottyBeams>
  );
}

export default App;
