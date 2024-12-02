import TextArea from "@/components/TextAreaComponent";
import { $saeData, $setSaeData } from "@/store/Store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

export default function EditableTextArea({ dataKey, ...rest }) {
  const saeData = useStore($saeData);

  const [value, setValue] = useState("");

  useEffect(() => {
    const val = saeData?.[dataKey];
    if (val) {
      setValue(val);
    }
  }, [saeData, dataKey]);

  return (
    <>
      <TextArea
        {...rest}
        value={value}
        onChange={(v) => {
          $setSaeData({ [dataKey]: v });
        }}
      />
    </>
  );
}
