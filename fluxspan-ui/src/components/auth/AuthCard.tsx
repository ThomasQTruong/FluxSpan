import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthCardProps {
  className?: string;
  children?: ReactNode;
}

export function AuthCard( {className, children}: AuthCardProps ) {
  return (
    // Page container.
    <div className={ cn("w-full min-h-[calc(100dvh-5rem)] flex flex-col",
      "justify-center items-center p-2 pb-22", className) }
    >
      { /* Auth card. */ }
      <div className="w-full max-w-2xl h-auto flex flex-col pt-8 sm:pt-12 justify-center
                      items-center rounded-4xl bg-gray-50 shadow-md"
      >
        { children }
      </div>
    </div>
  );
}
