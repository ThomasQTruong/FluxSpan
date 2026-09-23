import { Logo } from '@/components/Logo';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavbarProps {
  logoClassName?: string;
  linkClassName?: string;
}

export function Navbar({ logoClassName, linkClassName }: NavbarProps) {
  return (
    <nav className="flex h-20 items-center justify-between px-12 md:px-18 lg:px-24">
      {/* Logo */}
      <Link to="/dashboard">
        <Logo textClassName={logoClassName} />
      </Link>
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className={cn(
            'cursor-pointer text-2xl font-medium font-semibold text-slate-900 hover:text-slate-700',
            linkClassName
          )}
        >
          Log In
        </Link>
      </div>
    </nav>
  );
}
