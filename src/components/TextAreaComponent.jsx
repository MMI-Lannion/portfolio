// TextAreaComponent.js

import React from 'react';
import { TextArea } from "@radix-ui/themes";

export default function TextAreaComponent({ onChange }) {
    const [value, setValue] = React.useState('');
  
    const handleInputChange = (e) => {
      const lines = e.target.value.split('\n');
  
      // Limite le nombre de lignes à 4
      if (lines.length > 4) {
        const newValue = lines.slice(0, 4).join('\n');
        setValue(newValue);
        onChange(newValue); // Remonte la nouvelle valeur au parent
      } else {
        setValue(e.target.value);
        onChange(e.target.value); // Remonte la nouvelle valeur au parent
      }
    };
  
    return (
      <TextArea
        id="TextAreaComponent"
        value={value}
        onChange={handleInputChange}
        rows="4"
        style={{
          resize: 'none',
          lineHeight: '1.5',
          maxHeight: 'calc(1.5em * 4)',
          overflowY: 'auto',
        }}
        placeholder="Your text here..."
      />
    );
  }
  