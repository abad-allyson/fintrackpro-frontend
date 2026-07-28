"use client";

import { useState } from "react";

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

const initialForm = {
  date: "",
  description: "",
  category: "",
  type: "",
  amount: "",
};

const categories = [
  { label: "Income", value: "income" },
  { label: "Software", value: "software" },
  { label: "Travel", value: "travel" },
  { label: "Meals", value: "meals" },
  { label: "Utilities", value: "utilities" },
  { label: "Others", value: "others" },
];

export default function TransactionForm({ onCancel, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    setForm(initialForm);
    onCancel?.();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      // API call
      console.log(form);

      setForm(initialForm);

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
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
        <Label htmlFor="description">Description</Label>
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
        <Label htmlFor="category">Category</Label>
        <Select items={categories}>
          <SelectTrigger className="w-full">
            <SelectValue />
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
        <Label htmlFor="type">Type</Label>
        <FieldSet className="w-full max-w-xs">
          <RadioGroup defaultValue="income">
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
        <Label htmlFor="amount">Amount</Label>
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
          variant="accent"
          size="lg"
        >
          {loading ? "Saving..." : "Add Transaction"}
        </Button>
      </div>
    </form>
  );
}
