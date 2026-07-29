"use client";

import { useState } from "react";

import TransactionHeader from "./TransactionsHeader";
import TransactionsFilters from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";

export default function TransactionsClient() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <TransactionHeader />

      <TransactionsFilters onTransactionsChange={setTransactions} />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
