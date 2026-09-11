// https://21st.dev/@jatin-yadav05/components/elegant-dark-pattern

import type React from "react";
import { cn } from "@/lib/utils";
import bgImage from "@/assets/DottyBeamsBg.png";

interface DottyBeamsProps {
  children?: React.ReactNode;
  className?: string;
}

export function DottyBeams({ children, className = "" }: DottyBeamsProps) {
  const color1 = `rgb(143, 236, 255)`;  // original: 0, 207, 255.
  const color2 = `rgb(209, 209, 209)`;  // original: 46, 46, 46.
  const color3 = `rgb(255, 255, 255)`;  // original: 0, 0, 0.

  // Helper to apply custom opacity to standard hex, rgb, or rgba strings, enabling IDE color pickers/sliders to work
  const withOpacity = (color: string, opacity: number) => {
    if (color.startsWith('#')) {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    const match = color.match(/\d+,\s*\d+,\s*\d+/);
    if (match) {
      return `rgba(${match[0]}, ${opacity})`;
    }
    return color;
  };

  return (
    <div className={cn("relative min-h-screen w-full bg-black overflow-hidden", className)}>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              `radial-gradient(100% 100% at 0% 0%, ${color2} 0%, ${color3} 100%)`,
            mask:
              `radial-gradient(125% 100% at 0% 0%, ${color3} 0%, ${withOpacity(color3, 0.224)} 88.2883%, ${withOpacity(color3, 0)} 100%)`,
          }}
        >
          {/* Skewed fading blue streaks */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                `linear-gradient(${color1} 0%, ${withOpacity(color1, 0)} 100%)`,
              mask:
                `linear-gradient(90deg, ${withOpacity(color3, 0)} 0%, ${color3} 20%, ${withOpacity(color3, 0)} 36%, ${color3} 55%, ${withOpacity(color3, 0.13)} 67%, ${color3} 78%, ${withOpacity(color3, 0)} 97%)`,
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                `linear-gradient(${color1} 0%, ${withOpacity(color1, 0)} 100%)`,
              mask:
                `linear-gradient(90deg, ${withOpacity(color3, 0)} 11%, ${color3} 25%, ${withOpacity(color3, 0.55)} 41%, ${withOpacity(color3, 0.13)} 67%, ${color3} 78%, ${withOpacity(color3, 0)} 97%)`,
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                `linear-gradient(${color1} 0%, ${withOpacity(color1, 0)} 100%)`,
              mask:
                `linear-gradient(90deg, ${withOpacity(color3, 0)} 9%, ${color3} 20%, ${withOpacity(color3, 0.55)} 28%, ${withOpacity(color3, 0.424)} 40%, ${color3} 48%, ${withOpacity(color3, 0.267)} 54%, ${withOpacity(color3, 0.13)} 78%, ${color3} 88%, ${withOpacity(color3, 0)} 97%)`,
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                `linear-gradient(${color1} 0%, ${withOpacity(color1, 0)} 100%)`,
              mask:
                `linear-gradient(90deg, ${withOpacity(color3, 0)} 0%, ${color3} 17%, ${withOpacity(color3, 0.55)} 26%, ${color3} 35%, ${withOpacity(color3, 0)} 47%, ${withOpacity(color3, 0.13)} 69%, ${color3} 79%, ${withOpacity(color3, 0)} 97%)`,
              transform: "skewX(45deg)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                `linear-gradient(${color1} 0%, ${withOpacity(color1, 0)} 100%)`,
              mask:
                `linear-gradient(90deg, ${withOpacity(color3, 0)} 0%, ${color3} 20%, ${withOpacity(color3, 0.55)} 27%, ${color3} 42%, ${withOpacity(color3, 0)} 48%, ${withOpacity(color3, 0.13)} 67%, ${color3} 74%, ${color3} 82%, ${withOpacity(color3, 0.47)} 88%, ${withOpacity(color3, 0)} 97%)`,
              transform: "skewX(45deg)",
            }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-5 bg-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "149.76px",
        }}
      />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0, 0.5) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
