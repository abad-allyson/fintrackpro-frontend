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

import { categories, months } from "@/constants/global.constants";
import { getSelectedLabel } from "@/lib/getSelectedLabel";

export default function BudgetDetailsDialog({
  open,
  onOpenChange,
  budget,
  onEdit,
  onDeleteClick,
}) {
  if (!budget) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Budget Details
          </DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="space-y-4 px-1">
          <div className="flex flex-row justify-between items-center">
            <div className="space-y-1">
              <p className="text-lg font-bold">
                {getSelectedLabel(categories, budget.category)}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">
                ₱{budget.monthlyLimit?.toLocaleString()}
              </p>
            </div>
          </div>
          <Separator />

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Category</p>
            <p className="font-semibold">
              {getSelectedLabel(categories, budget.category)}
            </p>
          </div>

          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Monthly Limit</p>
            <p className="font-semibold">
              ₱{budget.monthlyLimit?.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Spent</p>
            <p className="font-semibold">₱</p>
          </div>
          <div className="flex justify-between px-1">
            <p className="text-muted-foreground">Remaining</p>
            <p className="font-semibold">₱</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => onEdit(budget)}
            className="flex-1 py-5 px-6"
            variant="secondary"
          >
            <Pencil className="mr-1" /> Edit Budget
          </Button>

          <Button
            variant="destructive"
            className="flex-1 py-5 px-6"
            onClick={() => {
              onOpenChange(false);
              onDeleteClick();
            }}
          >
            <Trash2 className="mr-1" /> Delete Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
