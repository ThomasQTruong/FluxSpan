export function SignUpForm() {
  return (
    <form className="flex w-full flex-col items-center justify-center gap-6 px-8 sm:px-12">
      {/* Email/Password inputs. */}
      <div className="flex w-full flex-col gap-2 sm:gap-4">
        {/* Email. */}
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

        {/* Password. */}
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

        {/* Confirm password. */}
        <div>
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            className="w-full rounded-md border p-2 transition-colors duration-300 ease-in-out hover:border-gray-700 hover:bg-gray-100"
          />
        </div>

        {/* Submit button. */}
        <button
          type="submit"
          className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
        >
          Create
        </button>
      </div>
    </form>
  );
}
