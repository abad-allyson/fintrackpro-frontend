"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  categories,
  types,
  initialFilters,
  months,
  years,
} from "@/constants/transactions.constants";
import { getSelectedLabel } from "@/lib/getSelectedLabel";

export default function TransactionsFilter({ filters, setFilters }) {
  function updateFilter(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return (
    <div className="flex flex-row gap-2">
      {/* Search */}
      <div className="flex-1">
        <Input
          placeholder="Search"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="bg-white border-outline h-full w-md"
        />
      </div>

      {/* Month */}
      <Select
        value={filters.month}
        onValueChange={(value) => updateFilter("month", value)}
      >
        <SelectTrigger className="bg-white border-outline">
          <SelectValue placeholder="Month">
            {getSelectedLabel(months, filters.month)}
          </SelectValue>
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
        value={filters.year}
        onValueChange={(value) => updateFilter("year", value)}
      >
        <SelectTrigger className="bg-white border-outline">
          <SelectValue placeholder="Year" />
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
        value={filters.category}
        onValueChange={(value) => updateFilter("category", value)}
      >
        <SelectTrigger className="bg-white border-outline">
          <SelectValue placeholder="Category" />
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
        value={filters.type}
        onValueChange={(value) => updateFilter("type", value)}
      >
        <SelectTrigger className="bg-white border-outline">
          <SelectValue placeholder="Type" />
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
