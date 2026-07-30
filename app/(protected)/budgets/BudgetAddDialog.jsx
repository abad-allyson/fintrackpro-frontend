"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import BudgetForm from "@/components/BudgetForm";

export default function BudgetAddDialog({
  open,
  onOpenChange,
  selectedBudget,
  onSubmit,
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {selectedBudget ? "Edit Budget" : "Add Budget"}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <BudgetForm
          budget={selectedBudget}
          isEdit={!!selectedBudget}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
