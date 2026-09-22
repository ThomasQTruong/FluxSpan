import { cn } from "@/lib/utils";
import { SocialAuth } from "@/components/auth/SocialAuth";
import { Link } from "react-router-dom";

interface AuthFormProps {
  className?: string;
}

export function AuthForm({className}: AuthFormProps) {
  return (
    // Page container.
    <div className={cn("w-full min-h-[calc(100dvh-5rem)] flex flex-col",
                       "justify-center items-center p-2 pb-22", className)}>
      {/* Box container. */}
      <div className="w-full max-w-2xl h-auto flex flex-col
                      pt-8 sm:pt-12 justify-center items-center rounded-4xl bg-gray-50 shadow-md">
        {/* Auth title. */}
        <div className="text-2xl sm:text-4xl mb-4 sm:mb-8">
          <span className="font-bold">Sign In</span>
        </div>
        {/* Auth form. */}
        <form className="w-full px-8 sm:px-12 flex flex-col gap-6 justify-center items-center">
          {/* Email/Password inputs. */}
          <div className="w-full flex flex-col gap-2 sm:gap-4">
            <div>
              <span className="text-sm">Email</span>
              <input type="text" placeholder="Enter your email" className="w-full border rounded-md
                                      p-2 hover:border-gray-700 hover:bg-gray-100 transition-colors
                                      duration-300 ease-in-out" />
            </div>
            <div>
              <span className="text-sm">Password</span>
              <input type="password" placeholder="Enter your password" className="w-full border
                                         rounded-md p-2 hover:border-gray-700 hover:bg-gray-100
                                         transition-colors duration-300 ease-in-out" />
            </div>
          </div>
          {/* RememberMe and Forgot Password options. */}
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" id="rememberMe" className="w-4 h-4" />
              <label htmlFor="rememberMe" className="text-xs sm:text-sm">Stay Signed In</label>
            </div>
            <Link to="./" className="text-xs sm:text-sm underline hover:text-cyan-500
                    transition-colors duration-300 ease-in-out">
              Forgot Password?
            </Link>
          </div>
          {/* Submit button. */}
          <button type="submit" className="w-full rounded-4xl bg-cyan-500/60 hover:bg-cyan-500/75
                                    transition-colors duration-300 ease-in-out p-2">Submit</button>
        </form>
        {/* Social auth option(s). */}
        <SocialAuth />

        <hr className="w-full border-gray-300 mt-2 mdt:m-4" />

        {/* Sign Up option. */}
        <div className="w-full flex flex-row justify-center items-center gap-1 p-3">
          <span className="text-xs sm:text-sm">Don't have an account?</span>
          <Link to="./" className="text-xs sm:text-sm underline text-cyan-500 hover:text-cyan-600
                  transition-colors duration-300 ease-in-out">
            Sign Up instead.
          </Link>
        </div>
      </div>
    </div>
  );
}
