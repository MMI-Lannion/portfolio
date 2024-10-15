// AutoEvaluation.

import React from "react";
import { Radar } from "./Radar";
import { Flex, Text, Heading } from "@radix-ui/themes";

export default function AutoEvaluation() {
  // datas to send to radars
  const datasRadar1 = {};
  const datasRadar2 = {};
  const datasRadar3 = {};

  return (
    <Flex gap="4" direction="column">
      <Flex gap="1" direction="column">
        <Heading as="h3" size="3">
          Hardskills :
        </Heading>
        <Text>
          Estimez votre niveau de maitrise pour chaque sous compétence sur une
          échelle de 1 à 5 (1 = Pas du tout maitrisé ; 5 = Tout à fait maitrisé)
        </Text>

        <Radar datasRadar1={datasRadar1} />
      </Flex>

      <Flex gap="1" direction="column">
        <Heading as="h3" size="3">
          Softskills :
        </Heading>
        <Text>
          Identifiez le ou les softskills que vous avez utilisé lors de votre
          SAE ou de votre projet en ressource
        </Text>

        <Radar datasRadar1={datasRadar1} />
      </Flex>

      <Flex gap="1" direction="column">
        <Heading as="h3" size="3">
          Outils et méthodes :
        </Heading>
        <Text>
          Estimer votre niveau de maitrise pour chaque outil et méthode sur une
          échelle de 1 à 5 (1 = Pas du tout maitrisé ; 5 = Tout à fait maitrisé)
        </Text>

        <Radar datasRadar1={datasRadar1} />
      </Flex>
    </Flex>
  );
}
