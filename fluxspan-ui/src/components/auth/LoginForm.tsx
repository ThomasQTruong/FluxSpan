import { Link } from 'react-router-dom';

export function LoginForm() {
  return (
    <form className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12">
      {/* Email/Password inputs. */}
      <div className="flex w-full flex-col gap-2 sm:gap-4">
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full rounded-md border p-2 transition-colors duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            className="w-full rounded-md border p-2 transition-colors duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-100"
          />
        </div>
      </div>
      {/* RememberMe and Forgot Password options. */}
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <input type="checkbox" id="rememberMe" className="h-4 w-4" />
          <label htmlFor="rememberMe" className="text-xs sm:text-sm">
            Stay Signed In
          </label>
        </div>
        <Link
          to="./"
          className="text-xs underline transition-colors duration-300 ease-in-out hover:text-cyan-500 sm:text-sm"
        >
          Forgot Password?
        </Link>
      </div>
      {/* Submit button. */}
      <button
        type="submit"
        className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
      >
        Submit
      </button>
    </form>
  );
}
