// TextAreaComponent.js

import React from "react";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import { styled } from "@/lib/stitches";

const StyledTextArea = styled(RadixTextArea, {
  textarea: {
    fontSize: 23,
  },
});

export default function TextArea({ onChange, placeholder }) {
  const [value, setValue] = React.useState("");

  const handleInputChange = (e) => {
    const lines = e.target.value.split("\n");

    // Limite le nombre de lignes à 4
    if (lines.length > 4) {
      const newValue = lines.slice(0, 4).join("\n");
      setValue(newValue);
      onChange(newValue); // Remonte la nouvelle valeur au parent
    } else {
      setValue(e.target.value);
      onChange(e.target.value); // Remonte la nouvelle valeur au parent
    }
  };

  return (
    <StyledTextArea
      placeholder={placeholder}
      defaultValue={value}
      onChange={handleInputChange}
      rows="4"
      size="3"
      resize="none"
      // style={{
      //   resize: "none",
      //   lineHeight: "1.5",
      //   maxHeight: "calc(1.5em * 4)",
      //   // maxWidth: "1000px",
      //   // overflowY: "auto",
      // }}
    />
  );
}
