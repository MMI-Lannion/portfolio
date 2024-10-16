import { $saesStatus } from "@/store/Store";
import { useStore } from "@nanostores/react";
import {
  Card,
  Flex,
  Heading,
  Link,
  Text,
  Button,
  Badge,
} from "@radix-ui/themes";
import {
  CheckIcon,
  Cross2Icon,
  EyeOpenIcon,
  Pencil1Icon,
  Pencil2Icon,
} from "@radix-ui/react-icons"; // Import the icon

export function Home() {
  const saesStatus = useStore($saesStatus);
  return (
    <>
      <Heading as="h1" size="5" mb="3">
        Mes SAE
      </Heading>
      <Flex gap="5" wrap="wrap" justify="center">
        {saesStatus.but1.map((element) => (
          <Flex>
            <Card
              style={{
                minHeight:"200px",
                width: "250px",
              }}
            >
              <Flex direction="column" gap="3" m="1">
                <Heading as="h2" size="4">
                  {element.name}{" "}
                  {element.completed ? (
                    <>
                      <Badge color="green">
                        <CheckIcon />
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge color="red">
                        <Cross2Icon />
                      </Badge>
                    </>
                  )}
                </Heading>
                <Text
                  style={{
                    overflow: "auto",
                    flex: 1,
                    wordWrap: "break-word",
                  }}
                >
                  {element.description}
                </Text>

                  <Flex justify="center" gap="3">
                {element.completed ? (
                  <>
                    <Link href="#">
                      <Button>
                        Modifier
                        <Pencil2Icon />
                      </Button>
                    </Link>
                    <Link href="#">
                      <Button>
                        Consulter
                        <EyeOpenIcon />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="../saisie-sae">
                      <Button>
                        Compléter
                        <Pencil1Icon />
                      </Button>
                    </Link>
                  </>
                )}
                </Flex>
              </Flex>
            </Card>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
