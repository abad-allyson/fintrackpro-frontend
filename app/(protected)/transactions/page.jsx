import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TransactionHeader from "./TransactionsHeader";
import TransactionsTable from "./TransactionsTable";

export const metadata = {
  title: "Transactions",
};

export default async function Transactions() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  // TODO:
  // const transactions = await getTransactions();

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <TransactionHeader />

      <TransactionsTable transactions={[]} />
    </div>
  );
}
