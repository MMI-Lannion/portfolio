// TextAreaComponent.js

import React from "react";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import { styled } from "@/lib/stitches";

const StyledTextArea = styled(RadixTextArea, {
  textarea: {
    fontSize: 23,
  },
});

export default function TextArea({ onChange, placeholder, value }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledTextArea
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      rows="4"
      size="3"
      resize="none"
    />
  );
}
