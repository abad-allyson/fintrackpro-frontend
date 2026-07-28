export default function LogOutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-md font-bold">
        You have been logged out.{" "}
        <a href="/sign-in" className="text-accent-2 hover:underline">
          Sign in again
        </a>
      </h1>
    </div>
  );
}
