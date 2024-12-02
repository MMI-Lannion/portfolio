import React from "react";
import InputFile from "./InputFile";
import { $saeData, $setSaeData } from "@/store/Store";
import { Flex, Text } from "@radix-ui/themes";
import { useStore } from "@nanostores/react";

const SyntheseFiles = () => {
  return (
    <Flex direction="column">
      <InputFile
        onChange={(data) => {
          $setSaeData({ fichiers: data });
        }}
      />
    </Flex>
  );
};

export default SyntheseFiles;
