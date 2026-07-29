"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TransactionHeader({ onAdd }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>

      <Button variant="outline" size="lg" className="py-5 px-6">
        Import CSV
      </Button>

      <Button variant="accent" size="lg" className="py-5 px-6" onClick={onAdd}>
        <Plus />
        Add Transaction
      </Button>
    </div>
  );
}
