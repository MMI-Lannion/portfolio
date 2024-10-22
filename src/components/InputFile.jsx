import { styled } from "@/lib/stitches";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Callout, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { supabase } from '../lib/supabase.js';

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
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const files = event.target.fileInput.files;

    if (!files.length) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    for (const file of files) {
      const filePath = `${Date.now()}_${file.name}`; // Génère un nom de fichier unique
      const { data, error } = await supabase.storage
        .from('saeFiles')
        .upload(filePath, file);

      if (error) {
        console.error("Erreur lors de l'upload:", error.message);
        setUploadError(true);
        setUploadSuccess(false);
      } else {
        console.log("Upload réussi:", data);
        setUploadSuccess(true);
        setUploadError(false);
      }
    }
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
      {uploadError && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Erreur lors du téléchargement du fichier.</Callout.Text>
        </Callout.Root>
      )}
      {uploadSuccess && (
        <Callout.Root color="green" role="alert">
          <Callout.Icon>
            <CheckIcon />
          </Callout.Icon>
          <Callout.Text>Téléchargement réussi !</Callout.Text>
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
