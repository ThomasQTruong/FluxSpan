import { Link } from "react-router-dom";


interface AuthCardFooterProps {
  message?: string;
  link?: string;
}

export function AuthCardFooter({ message, link }: AuthCardFooterProps) {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-1 p-3">
      <span className="text-xs sm:text-sm">{ message }</span>
      <Link to="/login" className="text-xs sm:text-sm underline text-cyan-500 hover:text-cyan-600
              transition-colors duration-300 ease-in-out">
        { link }
      </Link>
    </div>
  );
}