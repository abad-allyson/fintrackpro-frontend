"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onCancel,
  onConfirm,
  title,
  itemName,
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-destructive">
            {title}
          </DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="flex flex-col items-center">
          <p className="">
            Are you you want to delete{" "}
            <span className="font-bold ">{itemName}?</span>{" "}
          </p>
          <p className="">This action cannot be undone.</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={onCancel}
            className="flex-1 py-5 px-6"
            variant="secondary"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-5 px-6 bg-destructive text-white"
            variant="destructive"
          >
            {loading ? <Spinner className="mx-auto h-4 w-4" /> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
