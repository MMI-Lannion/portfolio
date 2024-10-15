import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import { useStore } from "@nanostores/react";
import "@reach/combobox/styles.css";
import { $butSaes, $filterSea } from "@/store/Store";
import { Text, Checkbox, Flex } from "@radix-ui/themes";

export function Combobox() {
  const butSaes = useStore($butSaes);

  return (
    <>
      <ReachCombobox aria-labelledby="select" openOnFocus={true}>
        <ComboboxInput onChange={(e) => $filterSea.set(e.target.value)} />
        <ComboboxPopover>
          <ComboboxList>
            {butSaes.map((sae) => (
              <ComboboxOption value={sae} />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </ReachCombobox>
    </>
  );
}
