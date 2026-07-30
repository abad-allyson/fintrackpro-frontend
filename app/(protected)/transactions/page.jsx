import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TransactionClient from "./TransactionClient";

export const metadata = {
  title: "Transactions | FinTrackPro",
};

export default async function Transactions() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <TransactionClient />;
}
