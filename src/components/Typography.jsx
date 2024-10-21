import { Heading, Badge, Box, Flex, Separator, Text } from "@radix-ui/themes";

export function PageHeading({
  title,
  badgeTitle = "",
  badgeColor = "",
  sepWidth = "10%",
}) {
  return (
    <Box mb="6">
      <Flex gap="1" align="center" mb="2">
        <Heading size={{ initial: "6", md: "8" }}>{title}</Heading>
        {badgeTitle && (
          <Badge size="3" color={badgeColor}>
            {badgeTitle}
          </Badge>
        )}
      </Flex>
      <Separator
        style={{ width: sepWidth, background: "#000" }}
        size="4"
        orientation="horizontal"
      />
    </Box>
  );
}

export function PageSubHeading({ title }) {
  return <Heading size={{ initial: "4", md: "6" }}>{title}</Heading>;
}

export function PageText({ children }) {
  return <Text size={{ initial: "4", md: "6" }}>{children}</Text>;
}
