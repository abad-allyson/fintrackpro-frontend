"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import TransactionHeader from "./TransactionsHeader";
import TransactionsFilters from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import TransactionDetailsDialog from "./TransactionDetailsDialog";
import TransactionAddDialog from "./TransactionAddDialog";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import { toast } from "@/components/ui/toast";

import {
  getAllTransactions,
  deleteTransaction,
} from "@/services/transaction.service";
import { initialFilters } from "@/constants/transactions.constants";

export default function TransactionsClient() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  async function loadTransactions(currentFilters = filters) {
    try {
      const token = await getToken();

      const data = await getAllTransactions(token, currentFilters);

      setTransactions(data.items);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRowClick(transaction) {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  }

  function handleEdit(transaction) {
    setDetailsOpen(false);
    setSelectedTransaction(transaction);
    setFormOpen(true);
  }

  function handleAdd() {
    setSelectedTransaction(null);
    setFormOpen(true);
  }

  async function handleDelete() {
    try {
      const token = await getToken();

      const result = await deleteTransaction(selectedTransaction._id, token);

      toast.add({
        type: "success",
        description: result.message,
      });
      await loadTransactions();

      setConfirmDeleteOpen(false);
      setDetailsOpen(false);

      setSelectedTransaction(null);
    } catch (error) {
      toast.add({
        type: "error",
        description: "Failed to delete transaction.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <TransactionHeader onAdd={handleAdd} />

      <TransactionsFilters filters={filters} setFilters={setFilters} />

      <TransactionsTable
        transactions={transactions}
        onRowClick={handleRowClick}
      />

      <TransactionAddDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedTransaction={selectedTransaction}
        refreshTransactions={loadTransactions}
      />

      <TransactionDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        transaction={selectedTransaction}
        onEdit={handleEdit}
        onDeleteClick={() => setConfirmDeleteOpen(true)}
      />

      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete Transaction"
        itemName={selectedTransaction?.description}
        description="This action cannot be undone."
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
