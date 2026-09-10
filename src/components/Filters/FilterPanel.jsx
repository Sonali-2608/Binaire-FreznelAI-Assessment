import { Flex, Picker, Item, NumberField } from "@adobe/react-spectrum";

function TagPicker({ label, value, options, onChange }) {
  return (
    <Picker
      label={label}
      selectedKey={value || "__all__"}
      onSelectionChange={(key) => onChange(key === "__all__" ? "" : key)}
      width="100%"
    >
      <Item key="__all__">All</Item>
      {options.map((option) => (
        <Item key={option}>{option}</Item>
      ))}
    </Picker>
  );
}

export default function FilterPanel({ filters, options, onChange }) {
  const set = (key) => (value) => onChange({ ...filters, [key]: value });

  return (
    <Flex direction={{ base: "column", medium: "row" }} gap="size-200" marginBottom="size-200" wrap>
      <TagPicker label="Pipeline" value={filters.pipeline} options={options.pipelines} onChange={set("pipeline")} />
      <TagPicker label="Family" value={filters.family} options={options.families} onChange={set("family")} />
      <TagPicker
        label="Architecture"
        value={filters.architecture}
        options={options.architectures}
        onChange={set("architecture")}
      />
      <TagPicker label="Weight" value={filters.weight} options={options.weights} onChange={set("weight")} />
      <NumberField
        label="Safetensor min"
        value={filters.safetensorMin === "" ? undefined : Number(filters.safetensorMin)}
        onChange={(n) => set("safetensorMin")(Number.isNaN(n) ? "" : String(n))}
        minValue={0}
        width="100%"
      />
      <NumberField
        label="Safetensor max"
        value={filters.safetensorMax === "" ? undefined : Number(filters.safetensorMax)}
        onChange={(n) => set("safetensorMax")(Number.isNaN(n) ? "" : String(n))}
        minValue={0}
        width="100%"
      />
    </Flex>
  );
}
