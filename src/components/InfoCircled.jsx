import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

function InfoCircled({ text }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <InfoCircledIcon height="22" width="22" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>
            {text}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default InfoCircled;
