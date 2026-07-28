import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
