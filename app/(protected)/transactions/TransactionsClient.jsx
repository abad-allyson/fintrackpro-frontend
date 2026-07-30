"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import TransactionHeader from "./TransactionsHeader";
import TransactionsFilters from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import TransactionDetailsDialog from "./TransactionDetailsDialog";
import TransactionAddDialog from "./TransactionAddDialog";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import Pagination from "./Pagination";
import { toast } from "@/components/ui/toast";

import {
  getAllTransactions,
  deleteTransaction,
  addTransaction,
  updateTransaction,
} from "@/services/transaction.service";
import { initialFilters } from "@/constants/transactions.constants";

export default function TransactionsClient() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageRange, setPageRange] = useState("");

  const { getToken } = useAuth();

  useEffect(() => {
    loadTransactions();
  }, [filters, page]);

  async function loadTransactions(currentFilters = filters) {
    try {
      const token = await getToken();

      const data = await getAllTransactions(token, { ...currentFilters, page });

      setTransactions(data.items);
      setTotalPages(data.totalPages);
      setPageRange(data.pageRange);
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

  async function handleSubmit(form) {
    try {
      setLoading(true);

      const token = await getToken();

      if (selectedTransaction) {
        const result = await updateTransaction(
          selectedTransaction._id,
          form,
          token,
        );

        toast.add({
          type: "success",
          description: result.message,
        });
      } else {
        const result = await addTransaction(form, token);
        toast.add({
          type: "success",
          description: result.message,
        });
      }

      await loadTransactions();

      setFormOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: error.message,
      });
      setFormOpen(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
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
      setFormOpen(false);
    } finally {
      setLoading(false);
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageRange={pageRange}
      />

      <TransactionAddDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedTransaction={selectedTransaction}
        onSubmit={handleSubmit}
        loading={loading}
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
        loading={loading}
      />
    </div>
  );
}
