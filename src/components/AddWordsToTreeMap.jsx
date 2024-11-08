import React, { useState, useRef } from "react";
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Text,
  Button,
  Badge,
  TextField,
  Heading,
  Box,
} from "@radix-ui/themes";
import { $addKeyWord, $deleteKeyWord, $updatePercentage } from "../store/Store";

export function AddWordsToTreeMap({ data }) {
  const inputRef = useRef();
  const [localWords, setLocalWords] = useState([]);
  // const [inputValue, setInputValue] = useState('');

  const handleAddWord = (keyId) => {
    const inputValue = inputRef.current?.trim();
    console.log("ref", inputRef.current, inputValue);

    if (inputValue) {
      // Vérifie que l'input n'est pas vide
      $addKeyWord(keyId, inputValue);
      $updatePercentage();
      //$addKeyWord(key, inputValue)
      //  setInputValue(''); // Réinitialise le champ texte
    }
  };

  const handleRemoveWord = (keyId, inputValue) => {
    $deleteKeyWord(keyId, inputValue);
    $updatePercentage();
  };

  return (
    <Flex
      direction="column"
      gap="4"
      width="100%"
      maxHeight="300px"
      style={{ overflowY: "auto" }}
      // align="center"
      // justify="center"
    >
      {data?.map((e) => (
        <Flex px="4" gap="3" direction="column" width="100%">
          <Text size="2" weight="bold">
            Ajouter vos mots clés
          </Text>

          <Flex gap="2" direction="column">
            <Text>Mots clés :</Text>
            <Flex gap="4">
              {e.keywords.map((f) => (
                <Badge color={e.color} key={f}>
                  <Flex direction="row" align="center" justify="center" gap="2">
                    <Text>{f}</Text>
                    <CrossCircledIcon
                      onClick={() => handleRemoveWord(e.key, f)}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Badge>
              ))}
            </Flex>
          </Flex>

          <Flex gap="2" width="100%" direction="column">
            <Text weight="medium">{e.key}</Text>
            <Flex width="100%" gap="2">
              <TextField.Root
                variant="surface"
                type="text"
                style={{ width: "70%" }}
                placeholder="Ajouter"
                //value={inputValue}  // Liaison de l'input à l'état
                onChange={(e) => {
                  console.log("e target", e.target.value);

                  inputRef.current = e.target.value;
                }} // Mise à jour de l'état lors du changement de valeur
                // onKeyPress={handleKeyPress}  // Détection de la touche Enter
              />
              <Button onClick={() => handleAddWord(e.key)}>
                <PlusIcon />
                <Text>Ajouter</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
