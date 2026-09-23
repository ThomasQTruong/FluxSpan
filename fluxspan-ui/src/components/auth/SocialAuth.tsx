import { cn } from '@/lib/utils';

interface SocialAuthProps {
  message?: string;
  className?: string;
}

export function SocialAuth({ className, message }: SocialAuthProps) {
  return (
    <div className={cn('w-full pt-4', className)}>
      <div className="flex w-full flex-col items-center justify-center">
        <span className="text-xs font-bold sm:text-sm">{message}</span>
        <div className="flex flex-row">[ Google ]</div>
      </div>
    </div>
  );
}
