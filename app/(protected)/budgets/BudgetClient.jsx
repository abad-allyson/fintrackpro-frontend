"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import BudgetHeader from "./BudgetHeader";
import BudgetFilters from "./BudgetFilter";
import BudgetTable from "./BudgetTable";
import BudgetDetailsDialog from "./BudgetDetailsDialog";
import BudgetAddDialog from "./BudgetAddDialog";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import Pagination from "./Pagination";
import { toast } from "@/components/ui/toast";

import {
  getAllBudgets,
  deleteBudget,
  addBudget,
  updateBudget,
} from "@/services/budget.service";
import { getCurrentMonth } from "@/lib/getCurrentDate";

const initialFilters = {
  category: "",
  month: getCurrentMonth(),
};

export default function BudgetsClient() {
  const [budgets, setBudgets] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageRange, setPageRange] = useState("");

  const { getToken } = useAuth();

  async function loadBudgets(currentFilters = filters) {
    try {
      const token = await getToken();

      const data = await getAllBudgets(token, { ...currentFilters, page });

      setBudgets(data.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadBudgets();
  }, [filters, page]);

  function handleRowClick(budget) {
    setSelectedBudget(budget);
    setDetailsOpen(true);
  }

  function handleEdit(budget) {
    setDetailsOpen(false);
    setSelectedBudget(budget);
    setFormOpen(true);
  }

  function handleAdd() {
    setSelectedBudget(null);
    setFormOpen(true);
  }

  async function handleSubmit(form) {
    try {
      setLoading(true);

      const token = await getToken();

      if (selectedBudget) {
        const result = await updateBudget(selectedBudget._id, form, token);
        console.log("updating...");
        toast.add({
          type: "success",
          description: result.message,
        });
      } else {
        const result = await addBudget(form, token);
        toast.add({
          type: "success",
          description: result.message,
        });
      }

      await loadBudgets();

      setFormOpen(false);
      setSelectedBudget(null);
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

      const result = await deleteBudget(selectedBudget._id, token);

      toast.add({
        type: "success",
        description: result.message,
      });
      await loadBudgets();

      setConfirmDeleteOpen(false);
      setDetailsOpen(false);

      setSelectedBudget(null);
    } catch (error) {
      toast.add({
        type: "error",
        description: error.message || "Failed to delete budget.",
      });
      setConfirmDeleteOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 py-10 px-12">
      <BudgetHeader onAdd={handleAdd} />

      <BudgetAddDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        selectedBudget={selectedBudget}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <BudgetFilters filters={filters} setFilters={setFilters} />

      <BudgetTable budgets={budgets} onRowClick={handleRowClick} />

      <BudgetDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        budget={selectedBudget}
        onEdit={handleEdit}
        onDeleteClick={() => setConfirmDeleteOpen(true)}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageRange={pageRange}
      />

      <ConfirmDeleteDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete Budget"
        itemName={`budget for ${selectedBudget?.category}`}
        description="This action cannot be undone."
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  );
}
