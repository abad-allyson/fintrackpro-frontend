import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import BudgetsClient from "./BudgetClient";

export const metadata = {
  title: "Budgets | FinTrackPro",
};

export default async function Budgets() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }
  return <BudgetsClient />;
}
