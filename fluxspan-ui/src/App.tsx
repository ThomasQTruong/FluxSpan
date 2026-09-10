import DashboardGrid from './components/DashboardGrid';
import Navbar from './components/Navbar';
import Beams from './components/backgrounds/Beams';

function App() {
  return (
    <Beams>
      { /* <div className="bg-slate-50 min-h-screen bg-[radial-gradient(var(--color-slate-300)_1px,transparent_1px)] [background-size:24px_24px]"> */}
      <Navbar />
      <DashboardGrid />
      { /* </div> */}
    </Beams>
  );
}

export default App;
