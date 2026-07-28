import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Receipts",
};

export default async function Receipts() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold">RECEIPTS</h1>
      <p>Coming Soon.</p>
    </div>
  );
}
