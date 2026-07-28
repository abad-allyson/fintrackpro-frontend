import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Hello world</h1>
      <UserButton />
    </div>
  );
}
