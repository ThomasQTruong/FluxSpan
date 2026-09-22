import { cn } from "@/lib/utils";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { Link } from "react-router-dom";

interface AuthFormProps {
  className?: string;
}

export function AuthForm({className}: AuthFormProps) {
  return (
    <div className={cn("w-full min-h-[calc(100dvh-5rem)] flex flex-col",
                       "justify-center items-center p-2 pb-22", className)}>
      <div className="w-full max-w-2xl min-h-120 h-auto sm:min-h-150 flex flex-col
                      py-12 justify-center items-center rounded-4xl bg-gray-50 shadow-md">
        <form className="w-full flex flex-col gap-4 px-12 justify-center items-center">
          <div className="w-full flex flex-col gap-2">
            <input type="text" placeholder="Email"
                   className="w-full border rounded-md p-2 hover:border-gray-700 hover:bg-gray-100
                              transition-colors duration-300 ease-in-out" />
            <input type="password" placeholder="Password"
                   className="w-full border rounded-md p-2 hover:border-gray-700 hover:bg-gray-100
                             transition-colors duration-300 ease-in-out" />
          </div>
          <button type="submit" className="w-full rounded-4xl bg-cyan-500/60 hover:bg-cyan-500/75
                                    transition-colors duration-300 ease-in-out p-2">Submit</button>
        </form>
        <SocialAuth />
        <div className="w-full">
          <hr className="border-gray-300 m-2 md:m-4" />
          <div className="w-full flex flex-row justify-center items-center gap-1">
            <span className="text-sm">Don't have an account?</span>
            <Link to="./" className="text-sm underline text-cyan-500">Sign Up instead.</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
