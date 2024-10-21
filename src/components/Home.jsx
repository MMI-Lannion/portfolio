import { $saesStatus } from "@/store/Store";
import { useStore } from "@nanostores/react";
import { ArrowRightIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import { PageHeading } from "./Typography";

export function Home() {
  const saesStatus = useStore($saesStatus);
  return (
    <>
      <PageHeading title=" Mes SAEs" />

      <Flex gap="4" wrap="wrap" justify="center">
        {saesStatus.but1.map((element) => (
          <Flex>
            <Card
              style={{
                // minHeight: "200px",
                width: "370px",
              }}
            >
              <Flex direction="row" gap="3" m="1" height="100%">
                <Flex width="80%" direction="column" gap="2">
                  <Heading size="4">
                    {element.name}{" "}
                    {element.completed ? (
                      <>
                        <Badge color="green" size="3">
                          <CheckIcon />
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge color="red" size="3">
                          <Cross2Icon />
                        </Badge>
                      </>
                    )}
                  </Heading>
                  <Text
                    width="70%"
                    size="4"
                    style={{
                      overflow: "auto",
                      flex: 1,
                      wordWrap: "break-word",
                    }}
                  >
                    {element.description}
                  </Text>
                </Flex>

                <Separator orientation="vertical" style={{ height: "90%" }} />

                <Flex
                  align="end"
                  justify="center"
                  gap="3"
                  width="20%"
                  direction="column"
                >
                  <Link href="/synthese">
                    <Button size="3" variant="solid">
                      <ArrowRightIcon />
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
