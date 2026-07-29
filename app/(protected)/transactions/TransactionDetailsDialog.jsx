"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

import { categoryMap, typeMap } from "@/constants/transactions.constants";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

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

        <div className="space-y-4 px-1">
          <div className="flex flex-row justify-between items-center">
            <div className="space-y-1">
              <p className="text-lg font-bold ml-1">
                {transaction.description}
              </p>
              <Badge
                variant={
                  transaction.type === "income" ? "accent" : "destructive"
                }
                className="ring-0"
              >
                {transaction.type}
              </Badge>
            </div>
            <div>
              <p
                className={cn(
                  "text-lg font-bold",
                  transaction.type === "expense"
                    ? "text-destructive"
                    : "text-accent-2",
                )}
              >
                {transaction.type === "expense" ? "-₱ " : "+₱ "}
                {transaction.amount}
              </p>
            </div>
          </div>
          <Separator />

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Date</p>
            <p className="font-semibold">{formatDate(transaction.date)}</p>
          </div>

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Description</p>
            <p className="font-semibold">{transaction.description}</p>
          </div>

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Category</p>
            <p className="font-semibold">{categoryMap[transaction.category]}</p>
          </div>

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Type</p>
            <p className="font-semibold">{typeMap[transaction.type]}</p>
          </div>

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Amount</p>
            <p className="font-semibold">₱{transaction.amount}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => onEdit(transaction)}
            className="flex-1 py-5 px-6"
            variant="secondary"
          >
            <Pencil className="mr-1" /> Edit Transaction
          </Button>

          <Button variant="destructive" className="flex-1 py-5 px-6">
            <Trash2 className="mr-1" /> Delete Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
