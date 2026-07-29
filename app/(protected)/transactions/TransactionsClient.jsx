"use client";

import { useState } from "react";

import TransactionHeader from "./TransactionsHeader";
import TransactionsFilters from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

export default function TransactionsClient() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [open, setOpen] = useState(false);

  function handleRowClick(transaction) {
    setSelectedTransaction(transaction);
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <TransactionHeader />

      <TransactionsFilters onTransactionsChange={setTransactions} />

      <TransactionsTable
        transactions={transactions}
        onRowClick={handleRowClick}
      />

      <TransactionDetailsDialog
        open={open}
        onOpenChange={setOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
}
