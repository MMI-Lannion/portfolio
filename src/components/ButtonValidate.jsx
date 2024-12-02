import { $saveSaeData } from "@/store/Store.js";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { navigate } from "astro:transitions/client";

export function ButtonValidate() {
  const [error, setError] = useState(false);
  return (
    <Flex direction="column" gap="3">
      {error && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Erreur lors de l'enregistrement.</Callout.Text>
        </Callout.Root>
      )}

      <Button
        color="indigo"
        size="4"
        variant="surface"
        onClick={async () => {
          const result = $saveSaeData();
          if (result) {
            navigate("/merci");
            // window.location.href = "/merci";
          } else {
            setError(true);
          }
        }}
      >
        <CheckIcon />
        Valider
      </Button>
    </Flex>
  );
}
