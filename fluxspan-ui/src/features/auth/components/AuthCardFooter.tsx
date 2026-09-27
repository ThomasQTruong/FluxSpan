import { Link } from 'react-router-dom';

interface AuthCardFooterProps {
  message?: string;
  linkMessage?: string;
  link?: string;
}

export function AuthCardFooter({
  message,
  linkMessage,
  link = './',
}: AuthCardFooterProps) {
  return (
    <div className="w-full">
      <hr className="mdt:m-4 mt-2 w-full border-gray-300" />

      <div className="flex w-full flex-row items-center justify-center gap-1 p-3">
        <span className="text-xs sm:text-sm">{message}</span>
        <Link
          to={link}
          className="text-xs text-cyan-500 underline transition-colors duration-300 ease-in-out hover:text-cyan-600 sm:text-sm"
        >
          {linkMessage}
        </Link>
      </div>
    </div>
  );
}
