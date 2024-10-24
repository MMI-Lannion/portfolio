import { Flex, Text, Radio, Grid } from "@radix-ui/themes";
import { $saeData } from "@/store/Store.js";
import { useStore } from "@nanostores/react";
import React, { useRef } from "react";

function LikertScale({ competence, label }) {
  const labelRef = useRef();

  const hardSkills = useStore($saeData).hardskills;
  const competences = hardSkills.map((comp) => {
    if (comp.name === competence) {
      labelRef.current = comp[label];
    }
  });

  const updateStore = (value) => {
    const updatedHardSkills = hardSkills.map((comp) => {
      if (comp.name === competence) {
        return { ...comp, [label]: value };
      }
      return comp;
    });
    $saeData.set({ ...$saeData.get(), hardskills: updatedHardSkills });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    updateStore(value);
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
          <Radio
            value="0.1"
            checked={labelRef.current == "0.1"}
            onChange={handleChange}
          />
        </Flex>
        <Flex direction="column">
          <Radio
            value="0.2"
            checked={labelRef.current == "0.2"}
            onChange={handleChange}
          />
        </Flex>
        <Flex direction="column">
          <Radio
            value="0.3"
            checked={labelRef.current == "0.3"}
            onChange={handleChange}
          />
        </Flex>
        <Flex direction="column">
          <Radio
            value="0.4"
            checked={labelRef.current == "0.4"}
            onChange={handleChange}
          />
        </Flex>
        <Flex direction="column">
          <Radio
            value="0.5"
            checked={labelRef.current == "0.5"}
            onChange={handleChange}
          />
        </Flex>
      </Grid>
    </>
  );
}

export default LikertScale;
