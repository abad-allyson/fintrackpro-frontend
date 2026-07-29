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

export const categoryMap = Object.fromEntries(
  categories.map((item) => [item.value, item.label]),
);

export const typeMap = Object.fromEntries(
  types.map((item) => [item.value, item.label]),
);
