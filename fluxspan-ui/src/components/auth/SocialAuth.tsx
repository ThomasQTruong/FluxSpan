import { cn } from "@/lib/utils";

interface SocialAuthProps {
  message?: string;
  className?: string;
}

export function SocialAuth({ className, message }: SocialAuthProps) {
  return (
    <div className={ cn("w-full pt-4", className) }>
      <div className="w-full flex flex-col justify-center items-center">
        <span className="font-bold text-xs sm:text-sm">{ message }</span>
        <div className="flex flex-row">
          [ Google ]
        </div>
      </div>
    </div>
  );
}
