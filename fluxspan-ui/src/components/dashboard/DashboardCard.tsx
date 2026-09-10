import type { ReactNode } from 'react';

function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    // The card.
    <div className="bg-gray-200/40 rounded-xl backdrop-blur-md backdrop-saturate-900 border border-gray-300/70 shadow-md">
      <div className="py-2 text-center font-bold">{title}</div>
      <hr className="opacity-10" />
      <div className="px-4 py-1">
        {children}
      </div>
    </div>
  );
}

export default DashboardCard;