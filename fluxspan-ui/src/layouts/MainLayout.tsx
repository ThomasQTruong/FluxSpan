import { Outlet } from 'react-router-dom';
import { DottyBeams } from '@/components/backgrounds/DottyBeams';
import { Navbar } from '@/components/Navbar';

export function MainLayout() {
  return (
    <DottyBeams className="bg-slate-300">
      <Navbar />
      <main className="flex-1">
        {/* React Router will inject the current page's content here. */}
        <Outlet />
      </main>
    </DottyBeams>
  );
}
