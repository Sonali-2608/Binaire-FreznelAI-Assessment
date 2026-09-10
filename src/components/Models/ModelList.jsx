import { Flex, Text } from "@adobe/react-spectrum";
import ModelCard from "./ModelCard";

export default function ModelList({ models }) {
  if (models.length === 0) {
    return <Text>No models match your search/filters.</Text>;
  }

  return (
    <Flex direction="column" gap="size-150">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </Flex>
  );
}
