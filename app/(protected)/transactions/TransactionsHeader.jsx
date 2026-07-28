"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import TransactionForm from "@/components/TransactionForm";

export default function TransactionHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <Button variant="outline" size="lg" className="py-5 px-6">
        Import CSV
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          aschild="true"
          render={
            <Button variant="accent" size="lg" className="py-5 px-6">
              <Plus />
              Add Transaction
            </Button>
          }
        ></DialogTrigger>

        <DialogContent className="sm:max-w-md p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add Transaction
            </DialogTitle>
          </DialogHeader>

          <TransactionForm
            onCancel={() => setOpen(false)}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
