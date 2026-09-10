import type { ReactNode } from 'react';

function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    // The card.
    <div className="bg-white/40 rounded-xl backdrop-blur-4xl backdrop-saturate-150  shadow-lg">
      <div className="py-2 text-center font-bold">{title}</div>
      <hr className="opacity-10" />
      <div className="px-4 py-1">
        {children}
      </div>
    </div>
  );
}

export default DashboardCard;