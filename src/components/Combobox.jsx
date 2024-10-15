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
import { $butSaes } from "@/store/Store";
import { Text, Checkbox, Flex } from "@radix-ui/themes";

export function Combobox() {
  const butSaes = useStore($butSaes);
  return (
    <>
      <Text as="label" size="2">
        <Flex gap="2">
          <Checkbox defaultChecked />
          Agree to Terms and Conditions
        </Flex>
      </Text>
      <ReachCombobox aria-labelledby="select" openOnFocus={true}>
        <ComboboxInput />
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
