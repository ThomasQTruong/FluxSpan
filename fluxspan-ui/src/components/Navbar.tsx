import { Logo } from "@/components/Logo";

export function Navbar() {
  return (
    <nav className="h-20 px-12 md:px-18 lg:px-24 flex justify-between items-center">
      {/* Logo */}
      <a href="/">
        <Logo />
      </a>
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <a href="/login" className="text-2xl font-medium text-slate-900 cursor-pointer font-semibold
                                    hover:text-slate-700">
          Log In
        </a>
      </div>
    </nav>
  );
}
