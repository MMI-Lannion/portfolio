import React, { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Box } from "@radix-ui/themes";

function InfoCircled({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <InfoCircledIcon
            height="22"
            width="22"
            onClick={() => setOpen(!open)}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            style={{
              boxShadow: "0px 0px 10px -5px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              maxWidth: 300,
            }}
          >
            <Box
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            ></Box>
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default InfoCircled;
