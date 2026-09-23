import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AuthCardProps {
  className?: string;
  children?: ReactNode;
}

export function AuthCard({ className, children }: AuthCardProps) {
  return (
    // Page container.
    <div
      className={cn(
        'flex min-h-[calc(100dvh-5rem)] w-full flex-col',
        'items-center justify-center p-2 pb-22',
        className
      )}
    >
      {/* Auth card. */}
      <div className="flex h-auto w-full max-w-2xl flex-col items-center justify-center rounded-4xl bg-gray-50 pt-8 shadow-md sm:pt-12">
        {children}
      </div>
    </div>
  );
}
