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

  // TODO: Add fetching of transactions using getAllByUserId
  const transactions = [
    {
      date: "2026-07-01",
      description: "Monthly Salary",
      category: "Income",
      type: "income",
      amount: 45000,
    },
    {
      date: "2026-07-02",
      description: "Grocery",
      category: "Meals",
      type: "expense",
      amount: 1850,
    },
    {
      date: "2026-07-03",
      description: "Coffee",
      category: "Meals",
      type: "expense",
      amount: 180,
    },
    {
      date: "2026-07-04",
      description: "Netflix",
      category: "Entertainment",
      type: "expense",
      amount: 549,
    },
    {
      date: "2026-07-05",
      description: "Electricity Bill",
      category: "Utilities",
      type: "expense",
      amount: 3250,
    },
    {
      date: "2026-07-06",
      description: "Fuel",
      category: "Transportation",
      type: "expense",
      amount: 1500,
    },
    {
      date: "2026-07-08",
      description: "Freelance Project",
      category: "Income",
      type: "income",
      amount: 12000,
    },
    {
      date: "2026-07-10",
      description: "Internet Bill",
      category: "Utilities",
      type: "expense",
      amount: 1699,
    },
    {
      date: "2026-07-12",
      description: "Lunch",
      category: "Meals",
      type: "expense",
      amount: 250,
    },
    {
      date: "2026-07-14",
      description: "VS Code Theme",
      category: "Software",
      type: "expense",
      amount: 499,
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <TransactionHeader />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
