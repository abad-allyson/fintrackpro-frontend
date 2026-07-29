import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TransactionsClient from "./TransactionsClient";

export default async function Transactions() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <TransactionsClient />;
}
