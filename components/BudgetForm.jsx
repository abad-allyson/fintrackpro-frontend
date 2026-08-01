"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { categories, months, years } from "@/constants/global.constants";
import { Spinner } from "@/components/ui/spinner";

const initialForm = {
  category: "",
  monthlyLimit: "",
};

export default function BudgetForm({
  budget,
  isEdit,
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState(budget ?? initialForm);

  useEffect(() => {
    if (!budget) {
      setForm(initialForm);
      return;
    }

    setForm({
      ...initialForm,
      ...budget,
      date: budget.date ? budget.date.slice(0, 10) : "",
    });
  }, [budget]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleValueChange(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    setForm(initialForm);
    onCancel?.();
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">
          Category<span className="text-destructive">*</span>
        </Label>
        <Select
          items={categories}
          value={form.category}
          onValueChange={(value) => handleValueChange("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* monthlyLimit */}
      <div className="space-y-2">
        <Label htmlFor="monthlyLimit">
          Monthly Limit<span className="text-destructive">*</span>
        </Label>
        <Input
          id="monthlyLimit"
          name="monthlyLimit"
          type="number"
          placeholder="0.00"
          min={1}
          value={form.monthlyLimit}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          disabled={loading}
          variant="outline"
          className="flex-1 py-5 px-6"
          size="lg"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="flex-1 py-5 px-6"
          size="lg"
        >
          {loading ? (
            isEdit ? (
              "Saving Changes..."
            ) : (
              <Spinner className="mx-auto h-4 w-4" />
            )
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Add Budget"
          )}
        </Button>
      </div>
    </form>
  );
}
