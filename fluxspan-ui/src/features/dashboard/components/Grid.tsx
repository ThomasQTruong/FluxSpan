import { Card } from './Card';
import { cn } from '@/utils';

interface GridProps {
  className?: string;
}

export function Grid({ className }: GridProps) {
  return (
    <div
      className={cn(
        'grid h-full grid-cols-1 gap-4 p-4 lg:grid-cols-2',
        className
      )}
    >
      <Card title="Watchlist">
        <div>Test</div>
      </Card>
      <Card title="Trending (Value)">
        <div>Test2</div>
        <div>Test2</div>
      </Card>
      <Card title="Trending (Volume)">
        <div>Test3</div>
        <div>Test4</div>
      </Card>
      <Card title="Live Alerts">
        <div>Test6</div>
      </Card>
    </div>
  );
}
