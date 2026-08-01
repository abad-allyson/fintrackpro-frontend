"user client";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <DashboardClient />;
}
