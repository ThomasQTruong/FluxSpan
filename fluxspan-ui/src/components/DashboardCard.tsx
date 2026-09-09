import type { ReactNode } from 'react';

function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-gray-300">
      <div className="py-2 text-center font-bold">{title}</div>
      <hr className="opacity-10" />
      <div className="px-4 py-1">
        {children}
      </div>
    </div>
  );
}

export default DashboardCard;