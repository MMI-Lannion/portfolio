import React from "react";
import { Flex, Text, Radio, Grid } from "@radix-ui/themes";

function LikertScale() {
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <>
      <Grid columns="5" gap="3" rows="repeat(1, 64px)" width="100%">
        <Flex direction="column">
          <Text as="label" size="2">
            😲 - Pas du tout maîtrisé
          </Text>
        </Flex>
        <Flex direction="column">
          <Text as="label" size="2">
            🤔 - Un peu maîtrisé
          </Text>
        </Flex>
        <Flex direction="column">
          <Text as="label" size="2">
            😊 - Moyennement maîtrisé
          </Text>
        </Flex>
        <Flex direction="column">
          <Text as="label" size="2">
            😁 - Plutôt maîtrisé
          </Text>
        </Flex>
        <Flex direction="column">
          <Text as="label" size="2">
            🤩 - Tout à fait maîtrisé
          </Text>
        </Flex>
      </Grid>

      <Grid columns="5" gap="3" rows="repeat(1, 64px)" width="auto">
        <Flex direction="column">
          <Radio name="example" value="20" defaultChecked />
        </Flex>
        <Flex direction="column">
          <Radio name="example" value="20" defaultChecked />
        </Flex>
        <Flex direction="column">
          <Radio name="example" value="20" defaultChecked />
        </Flex>
        <Flex direction="column">
          <Radio name="example" value="20" defaultChecked />
        </Flex>
        <Flex direction="column">
          <Radio name="example" value="20" defaultChecked />
        </Flex>
      </Grid>
    </>
  );
}

export default LikertScale;
