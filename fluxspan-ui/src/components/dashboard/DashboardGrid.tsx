import { DashboardCard } from '@/components/dashboard/DashboardCard';

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
      <DashboardCard title="Watchlist">
        <div>Test</div>
      </DashboardCard>
      <DashboardCard title="Trending (Value)">
        <div>Test2</div>
        <div>Test2</div>
      </DashboardCard>
      <DashboardCard title="Trending (Volume)">
        <div>Test3</div>
        <div>Test4</div>
      </DashboardCard>
      <DashboardCard title="Live Alerts">
        <div>Test6</div>
      </DashboardCard>
    </div>
  );
}
