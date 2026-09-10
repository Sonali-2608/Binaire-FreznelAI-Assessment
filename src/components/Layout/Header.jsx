import { Flex, Heading, StatusLight, Button } from "@adobe/react-spectrum";

export default function Header({ isOnline, onLogout }) {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="center" marginBottom="size-300">
      <Heading level={1}>Model Selector</Heading>
      <Flex direction="row" alignItems="center" gap="size-200">
        <StatusLight variant={isOnline ? "positive" : "negative"}>
          {isOnline ? "Online" : "Offline"}
        </StatusLight>
        <Button variant="secondary" onPress={onLogout}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
}
