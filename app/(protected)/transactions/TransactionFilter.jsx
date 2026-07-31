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

import { categories, types, months, years } from "@/constants/global.constants";
import { getSelectedLabel } from "@/lib/getSelectedLabel";
import { getCurrentMonth, getCurrentYear } from "@/lib/getCurrentDate";

const initialFilters = {
  search: "",
  month: getCurrentMonth(),
  year: getCurrentYear(),
  category: "",
  type: "",
};

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
        <SelectTrigger className="bg-white border-outline pl-3">
          <SelectValue placeholder="Month" className="text-primary">
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
        <SelectTrigger className="bg-white border-outline pl-3">
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
        value={filters.category}
        onValueChange={(value) => updateFilter("category", value)}
      >
        <SelectTrigger className="bg-white border-outline pl-3">
          <SelectValue placeholder="Category" className="text-primary">
            {getSelectedLabel(categories, filters.category)}
          </SelectValue>
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
        <SelectTrigger className="bg-white border-outline pl-3">
          <SelectValue placeholder="Type" className="text-primary ">
            {getSelectedLabel(types, filters.type)}
          </SelectValue>
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
        className="bg-white border-outline text-primary px-3"
        variant="secondary"
      >
        Reset
      </Button>
    </div>
  );
}
