export function SignUpForm() {
  return (
    <form className="w-full px-8 sm:px-12 flex flex-col gap-6 justify-center items-center">
      { /* Email/Password inputs. */ }
      <div className="w-full flex flex-col gap-2 sm:gap-4">
        <div>
          <label htmlFor="email" className="text-sm">Email</label>
          <input type="text" id="email" className="w-full border rounded-md p-2
                                                   hover:border-gray-700 hover:bg-gray-100
                                                   transition-colors duration-300 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm">Password</label>
          <input type="password" id="password" autoComplete="new-password"
                 className="w-full border rounded-md p-2 hover:border-gray-700 hover:bg-gray-100
                            transition-colors duration-300 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-sm">Confirm Password</label>
          <input type="password" id="confirmPassword" autoComplete="new-password"
                 className="w-full border rounded-md p-2 hover:border-gray-700 hover:bg-gray-100
                            transition-colors duration-300 ease-in-out"
          />
        </div>
        { /* Submit button. */ }
        <button type="submit" className="w-full rounded-4xl bg-cyan-500/60 hover:bg-cyan-500/75
                                  transition-colors duration-300 ease-in-out p-2"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
