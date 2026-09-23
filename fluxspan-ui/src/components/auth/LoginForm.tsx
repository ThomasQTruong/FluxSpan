import { Link } from "react-router-dom";

export function LoginForm() {
  return (
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
  );
}
