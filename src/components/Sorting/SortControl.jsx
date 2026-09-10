import { Picker, Item } from "@adobe/react-spectrum";
import { SORT_KEYS } from "../../types/Model";

const OPTIONS = [
  { key: SORT_KEYS.SAFETENSOR_COUNT, label: "Safetensor file count" },
  { key: SORT_KEYS.NAME_ASC, label: "Model name A → Z" },
  { key: SORT_KEYS.NAME_DESC, label: "Model name Z → A" },
];

export default function SortControl({ sortKey, onChange }) {
  return (
    <Picker
      label="Sort by"
      selectedKey={sortKey}
      onSelectionChange={onChange}
      marginBottom="size-200"
      width="size-3000"
    >
      {OPTIONS.map((opt) => (
        <Item key={opt.key}>{opt.label}</Item>
      ))}
    </Picker>
  );
}
