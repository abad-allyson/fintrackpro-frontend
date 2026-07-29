"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import { categoryMap, typeMap } from "@/constants/transactions.constants";
import { formatDate } from "@/lib/format";

export default function TransactionDetailsDialog({
  open,
  onOpenChange,
  transaction,
  onEdit,
}) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-semibold">{formatDate(transaction.date)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Description</p>
            <p className="font-semibold">{transaction.description}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Category</p>
            <p className="font-semibold">{categoryMap[transaction.category]}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-semibold">{typeMap[transaction.type]}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-semibold">₱ {transaction.amount}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1 py-5 px-6"
            onClick={() => onEdit(transaction)}
          >
            <Pencil className="mr-1" /> Edit
          </Button>

          <Button variant="destructive" className="flex-1 py-5 px-6">
            <Trash2 className="mr-1" /> Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
