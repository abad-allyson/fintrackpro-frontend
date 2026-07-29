"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import TransactionForm from "@/components/TransactionForm";

export default function TransactionAddDialog({
  open,
  onOpenChange,
  selectedTransaction,
  refreshTransactions,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <TransactionForm
          transaction={selectedTransaction}
          refreshTransactions={refreshTransactions}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
