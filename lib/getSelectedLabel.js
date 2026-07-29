export function getSelectedLabel(options, value) {
  return options.find((option) => option.value === value)?.label;
}
