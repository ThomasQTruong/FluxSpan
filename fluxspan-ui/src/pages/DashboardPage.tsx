import { Grid } from '@/features/dashboard';

export function DashboardPage() {
  return (
    <div className="flex h-screen w-full flex-col lg:h-[calc(100dvh-5rem)]">
      <Grid className="h-512 px-8 pb-8 lg:flex-1" />
    </div>
  );
}
