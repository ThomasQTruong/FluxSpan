import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logoClassName?: string;
  linkClassName?: string;
}

export function Navbar({ logoClassName, linkClassName }: NavbarProps) {
  return (
    <nav className="h-20 px-12 md:px-18 lg:px-24 flex justify-between items-center">
      {/* Logo */}
      <Link to="/dashboard">
        <Logo textClassName={cn(logoClassName)}></Logo>
      </Link>
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link to="/login" className={cn("text-2xl font-medium text-slate-900 cursor-pointer font-semibold hover:text-slate-700", linkClassName)}>
          Log In
        </Link>
      </div>
    </nav>
  );
}
