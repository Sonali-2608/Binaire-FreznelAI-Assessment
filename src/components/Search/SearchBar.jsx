import { Flex, SearchField } from "@adobe/react-spectrum";

export default function SearchBar({ nameQuery, familyQuery, onNameChange, onFamilyChange }) {
  return (
    <Flex direction={{ base: "column", medium: "row" }} gap="size-200" marginBottom="size-200">
      <SearchField
        label="Model name"
        value={nameQuery}
        onChange={onNameChange}
        width="100%"
      />
      <SearchField
        label="Model family"
        value={familyQuery}
        onChange={onFamilyChange}
        width="100%"
      />
    </Flex>
  );
}
