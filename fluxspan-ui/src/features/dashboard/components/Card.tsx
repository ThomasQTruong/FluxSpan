import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children?: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    // The card.
    <div className="backdrop-blur-4xl rounded-xl border border-white/20 bg-white/40 shadow-lg backdrop-saturate-150">
      <div className="py-2 text-center font-bold">{title}</div>
      <hr className="opacity-10" />
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}
