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

  const handleAddWord = (keyId, index) => {
    const inputValue = inputRef.current?.trim();

    if (inputValue) {
      $addKeyWord(keyId, inputValue);
      $updatePercentage();
      document.querySelector(`[data-key="${index}"]`).value = "";
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
    >
      {data?.map((e, index) => (
        <Flex
          px="2"
          pb="4"
          gap="3"
          direction="column"
          width="100%"
          style={{ borderBottom: "1px solid #eee" }}
          key={index}
        >
          <Text weight="medium">{e.key}</Text>
          <Flex gap="2" direction="column">
            <Text size="2">Mots clés :</Text>
            <Flex gap="1" style={{ flexWrap: "wrap" }}>
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
            <Flex width="100%" gap="2">
              <TextField.Root
                variant="surface"
                type="text"
                style={{ width: "70%" }}
                placeholder="Ajouter"
                data-key={index}
                onChange={(e) => {
                  inputRef.current = e.target.value;
                }}
              />
              <Button onClick={() => handleAddWord(e.key, index)}>
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
