import {
  $competencesCles,
  $filterSea,
  $saeData,
  $updateCompetenceCle,
} from "@/store/Store";
import { useStore } from "@nanostores/react";
// import {
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
//   Combobox as ReachCombobox,
// } from "@reach/combobox";
import { useEffect, useLayoutEffect, useState } from "react";
import { AutoComplete } from "./AutoComplete";
import { Box, Flex } from "@radix-ui/themes";
import styles from "./Combobox.module.css";

export function Combobox() {
  const [saeData, setSaeData] = useState([]);

  const competencesCles = useStore($competencesCles) || [];
  const competenceCle = saeData?.competenceCle;
  const [open, setOpen] = useState(false);

  console.log("saeData", $saeData.get());

  useEffect(() => {
    setTimeout(() => {
      console.log("saeData", $saeData.get());

      setSaeData($saeData.get());
    }, 0);
  }, []);

  return (
    <>
      <AutoComplete
        data={competencesCles}
        defaultValue={competenceCle}
        onSelect={(item) => {
          setOpen(false);
          $updateCompetenceCle(item);
        }}
      />
    </>
  );
}
