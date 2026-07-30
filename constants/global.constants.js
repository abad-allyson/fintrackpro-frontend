export const categories = [
  { label: "Income", value: "income" },
  { label: "Software", value: "software" },
  { label: "Marketing", value: "marketing" },
  { label: "Travel", value: "travel" },
  { label: "Meals", value: "meals" },
  { label: "Utilities", value: "utilities" },
  { label: "Others", value: "others" },
];

export const categoryMap = Object.fromEntries(
  categories.map((item) => [item.value, item.label]),
);

export const types = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export const typeMap = Object.fromEntries(
  types.map((item) => [item.value, item.label]),
);

export const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const currentYear = new Date().getFullYear();

export const years = Array.from({ length: 10 }, (_, index) => {
  const year = currentYear - index;

  return {
    label: year.toString(),
    value: year,
  };
});
