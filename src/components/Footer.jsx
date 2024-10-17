import { Text, Link, Flex, Separator } from "@radix-ui/themes";

export function Footer() {
  return (
    <Flex
      style={{ height: 42 }}
      direction="column"
      justify="center"
      align="center"
      gap="3"
    >
      <Separator
        size="1"
        orientation="horizontal"
        style={{
          width: "90%",
        }}
      />
      <Flex justify="center" align="center" gap="3" width="100%" px="3">
        <Flex width="200px" justify="end">
          <Link
            href="#"
            color="white"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Text>IUT Lannion, MMI, Portfolio</Text>
          </Link>
        </Flex>
        <Flex width="200px" justify="end">
          <Link
            href="#"
            color="white"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Text>Données et vie privée</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
