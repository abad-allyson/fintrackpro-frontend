"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getAllTransactions } from "@/services/transaction.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { categories, types } from "@/constants/transactions.constants";

const initialFilters = {
  search: "",
  month: "",
  year: "",
  category: "",
  type: "",
};

const months = [
  { label: "Januray", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const years = [
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
];

export default function TransactionsFilter({ onTransactionsChange }) {
  const { getToken } = useAuth();

  const [filters, setFilters] = useState(initialFilters);

  function updateFilter(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  useEffect(() => {
    async function loadTransactions() {
      try {
        const token = await getToken();
        const data = await getAllTransactions(token, filters);

        onTransactionsChange(data.items);
      } catch (error) {
        console.error(error);
      }
    }

    loadTransactions();
  }, [filters, getToken, onTransactionsChange]);

  return (
    <div className="flex flex-row gap-1">
      <div className="flex-1">
        {/* Search */}
        <Input
          placeholder="Search"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="bg-white border-outline w-90 h-full"
        />
      </div>
      {/* Month */}
      <Select
        items={months}
        value={filters.month}
        onValueChange={(value) => updateFilter("month", value)}
      >
        <SelectTrigger className="bg-white border-outline p-4">
          <SelectValue placeholder="Month" className="text-primary" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {months.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Year */}
      <Select
        items={years}
        value={filters.year}
        onValueChange={(value) => updateFilter("year", value)}
      >
        <SelectTrigger className="bg-white border-outline p-4">
          <SelectValue placeholder="Year" className="text-primary" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Category */}
      <Select
        items={categories}
        value={filters.category}
        onValueChange={(value) => updateFilter("category", value)}
      >
        <SelectTrigger className="bg-white border-outline p-4">
          <SelectValue placeholder="Category" className="text-primary" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Type */}
      <Select
        items={types}
        value={filters.type}
        onValueChange={(value) => updateFilter("type", value)}
      >
        <SelectTrigger className="bg-white border-outline p-4">
          <SelectValue placeholder="Type" className="text-primary" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {types.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={resetFilters}
        className="bg-white border-outline text-primary p-4"
        variant="secondary"
      >
        Reset
      </Button>
    </div>
  );
}
