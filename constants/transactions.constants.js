export const initialFilters = {
  search: "",
  month: "",
  year: "",
  category: "",
  type: "",
};

export const categories = [
  { label: "Income", value: "income" },
  { label: "Software", value: "software" },
  { label: "Travel", value: "travel" },
  { label: "Meals", value: "meals" },
  { label: "Utilities", value: "utilities" },
  { label: "Others", value: "others" },
];

export const types = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export const months = [
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

export const years = [
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
];

export const categoryMap = Object.fromEntries(
  categories.map((item) => [item.value, item.label]),
);

export const typeMap = Object.fromEntries(
  types.map((item) => [item.value, item.label]),
);
