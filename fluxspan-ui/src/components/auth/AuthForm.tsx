import { cn } from "@/lib/utils";

interface AuthFormProps {
  className?: string;
}

export function AuthForm({className}: AuthFormProps) {
  return (
    <div className={cn("w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-10rem)] flex flex-col justify-center items-center md:py-30", className)}>
      <form className="w-screen max-w-2xl h-screen flex flex-col justify-center items-center gap-8 p-12 bg-rose-100 md:rounded-4xl">
        <input type="text" placeholder="Email" className="w-full border rounded-md p-2" />
        <input type="password" placeholder="Password" className="w-full border rounded-md p-2" />
        <button type="submit" className="w-1/2 md:w-1/3 border rounded-4xl p-2">Submit</button>
      </form>
    </div>
  );
}
