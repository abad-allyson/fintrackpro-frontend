"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  pageRange,
}) {
  return (
    <div className="flex justify-end gap-2 items-center">
      <Button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        size="icon"
        className="rounded-full"
        variant="ghost"
      >
        <ChevronLeft />
      </Button>

      <div className=" ">
        <span className="text-xs">{pageRange}</span>
      </div>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        size="icon"
        className="rounded-full"
        variant="ghost"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
