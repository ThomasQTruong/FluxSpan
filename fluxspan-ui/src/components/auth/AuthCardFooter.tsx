import { Link } from "react-router-dom";


interface AuthCardFooterProps {
  message?: string;
  linkMessage?: string;
  link?: string;
}

export function AuthCardFooter({ message, linkMessage, link="./" }: AuthCardFooterProps) {
  return (
    <div className="w-full">
      <hr className="w-full border-gray-300 mt-2 mdt:m-4" />

      <div className="w-full flex flex-row justify-center items-center gap-1 p-3">
        <span className="text-xs sm:text-sm">{ message }</span>
        <Link to={ link } className="text-xs sm:text-sm underline text-cyan-500 hover:text-cyan-600
                transition-colors duration-300 ease-in-out">
          { linkMessage }
        </Link>
      </div>
    </div>
  );
}