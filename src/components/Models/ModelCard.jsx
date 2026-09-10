import { View, Heading, Text, Flex, Badge } from "@adobe/react-spectrum";

export default function ModelCard({ model }) {
  return (
    <View borderWidth="thin" borderColor="dark" borderRadius="medium" padding="size-200">
      <Heading level={4} marginTop="size-0" marginBottom="size-50">
        {model.display_name}
      </Heading>
      <Text>{model.family}</Text>
      <Flex direction="row" gap="size-100" wrap marginTop="size-100">
        <Badge variant="informative">{model.hf_tags?.pipeline_tag}</Badge>
        <Badge variant="neutral">{model.architecture_category}</Badge>
        <Badge variant="neutral">Safetensors: {model.safetensor_file_count}</Badge>
      </Flex>
    </View>
  );
}
