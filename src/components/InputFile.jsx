import { Callout, Flex } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const InputFile = ({ onChange = null }) => {
    const [fileError, setFileError] = useState(false);

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
            }
            else {
                onChange?.(files);
            }
        }

        setFileError(hasError);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
            <Flex direction='column'>
            {fileError && (
                    <Callout.Root color="red" role="alert">
                        <Callout.Icon>
                            <ExclamationTriangleIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Le fichier dépasse la limite de 5 Mo.
                        </Callout.Text>
                    </Callout.Root>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="fileInput"
                        accept="image/*, video/*, .pdf, .doc, .docx, .odt"
                        multiple
                        onChange={handleFileChange}
                    />
                    <input type="url" name="linkInput" placeholder="Entrer une url" />
                    <button type="submit">Ajouter</button>
                </form>
                
            </Flex>
    );
};

export default InputFile;
