import React from "react";
import { Flex, Text, Radio } from "@radix-ui/themes";

function LikertScale() {
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <>
      <Flex align="start" direction="row" gap="5">
        <Flex
          asChild
          gap="2"
          direction="column-reverse"
          onChange={handleChange}
        >
          <Text as="label" size="2">
            <Radio name="example" value="20" defaultChecked />
            Pas du tout d'accord
          </Text>
        </Flex>

        <Flex
          asChild
          gap="2"
          direction="column-reverse"
          onChange={handleChange}
        >
          <Text as="label" size="2">
            <Radio name="example" value="40" />
            Pas d'accord
          </Text>
        </Flex>

        <Flex
          asChild
          gap="2"
          direction="column-reverse"
          onChange={handleChange}
        >
          <Text as="label" size="2">
            <Radio name="example" value="60" />
            Ni en désaccord ni d'accord
          </Text>
        </Flex>

        <Flex
          asChild
          gap="2"
          direction="column-reverse"
          onChange={handleChange}
        >
          <Text as="label" size="2">
            <Radio name="example" value="80" />
            D'accord
          </Text>
        </Flex>

        <Flex
          asChild
          gap="2"
          direction="column-reverse"
          onChange={handleChange}
          client:load
        >
          <Text as="label" size="2">
            <Radio name="example" value="100" />
            Tout à fait d'accord
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default LikertScale;
