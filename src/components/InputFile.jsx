import { styled } from "@/lib/stitches";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

const FileInputContainer = styled(Box, {
  display: "flex",
  alignItems: "center",
  padding: 12,
  backgroundColor: "#f5f5f5",
  borderRadius: 30,
  border: "1px solid #eaeaea",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#005bb5",
  },
});

const HiddenInput = styled("input", {
  display: "none",
});

const Label = styled("label", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  gap: 3,
  "&:hover": {
    color: "#005bb5",
  },
});

const InputFile = ({ onChange = null }) => {
  const [fileError, setFileError] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("event files", files);
    const maxSize = 5 * 1024 * 1024;
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > maxSize) {
        hasError = true;
        event.target.value = "";
        onChange?.([]);
        break;
      } else {
        onChange?.(files);
      }
    }

    setFileError(hasError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Flex direction="column" gap="3">
      {fileError && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Le fichier dépasse la limite de 5 Mo.</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit}>
        <Flex gap="3" align="center">
          <FileInputContainer>
            <Label htmlFor="fileInput">
              <UploadIcon />
              <Text>Ajouter un ou plusieurs fichiers</Text>
            </Label>
            <HiddenInput
              id="fileInput"
              type="file"
              name="fileInput"
              accept="image/*, video/*, .pdf, .doc, .docx, .odt"
              multiple
              onChange={handleFileChange}
            />
          </FileInputContainer>

          {/* <input
          type="file"
          name="fileInput"
          accept="image/*, video/*, .pdf, .doc, .docx, .odt"
          multiple
          onChange={handleFileChange}
        /> */}
          {/* <input type="url" name="linkInput" placeholder="Entrer une url" /> */}
          <Button type="submit" size="4">
            <CheckIcon />
            Valider
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default InputFile;
