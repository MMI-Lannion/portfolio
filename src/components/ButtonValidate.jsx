import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { updateHardskills } from "@/actions/updateHardskills";
import { $saeData } from "@/store/Store.js";
import { useStore } from "@nanostores/react";

export function ButtonValidate() {
  const hardskills = useStore($saeData).hardskills;
  const userId = useStore($saeData).userId;
  const saeId = useStore($saeData).saeId;

  const handleClick = () => {
    console.log("click");
    updateHardskills(userId, saeId, hardskills);
  };

  return (
    <Button color="indigo" size="4" variant="surface" onClick={handleClick}>
      <CheckIcon />
      Valider
    </Button>
  );
}
