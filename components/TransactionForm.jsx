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
import { Field, FieldSet, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories } from "@/constants/transactions.constants";

const initialForm = {
  date: "",
  description: "",
  category: "",
  type: "income",
  amount: "",
};

export default function TransactionForm({
  transaction,
  isEdit,
  onSubmit,
  onCancel,
  loading,
}) {
  const [form, setForm] = useState(transaction ?? initialForm);

  useEffect(() => {
    if (!transaction) {
      setForm(initialForm);
      return;
    }

    setForm({
      ...initialForm,
      ...transaction,
      date: transaction.date ? transaction.date.slice(0, 10) : "",
    });
  }, [transaction]);

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
      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date">
          Date<span className="text-destructive">*</span>
        </Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Input
          id="description"
          name="description"
          placeholder="Eg. Salary, Rent, Groceries"
          value={form.description}
          onChange={handleChange}
        />
      </div>

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

      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type">
          Type<span className="text-destructive">*</span>
        </Label>
        <FieldSet className="w-full max-w-xs">
          <RadioGroup
            value={form.type}
            onValueChange={(value) => handleValueChange("type", value)}
          >
            <Field orientation="horizontal">
              <RadioGroupItem value="income" id="type-income" />
              <FieldLabel htmlFor="type-income" className="font-normal">
                Income
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="expense" id="type-expense" />
              <FieldLabel htmlFor="type-expense" className="font-normal">
                Expense
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">
          Amount<span className="text-destructive">*</span>
        </Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="0.00"
          min={1}
          value={form.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
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
          {isEdit ? "Save Changes" : "Add Transaction"}
        </Button>
      </div>
    </form>
  );
}
