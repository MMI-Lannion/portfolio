import React, { useState, useRef } from 'react';
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, Text, Button, Badge, TextField, Heading, Box} from "@radix-ui/themes";
import {$addKeyWord, $deleteKeyWord, $updatePercentage} from '../store/Store';

export function AddWordsToTreeMap({ data,  onWordsUpdate }) {
  const inputRef = useRef();
  const [localWords, setLocalWords] = useState([]); 
 // const [inputValue, setInputValue] = useState(''); 

  const handleAddWord = (keyId) => {
    const inputValue = inputRef.current?.trim();
    console.log('ref', inputRef.current,inputValue);
    
    if (inputValue) { // Vérifie que l'input n'est pas vide
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
    <Flex direction="column" gap="4">
      {data.children.map((e)=> <><Heading size="6">Ajouter vos mots clés</Heading>
      <Box gap="2">
        <Text>Mots clés :</Text>
        <Flex gap="4">
          {e.keywords.map((f) => (
            <Badge color={e.color} key={f}>
              <Flex direction="row" align="center" justify="center" gap="2">
                <Text>{f}</Text>
                <CrossCircledIcon onClick={() => handleRemoveWord(e.key, f)} style={{ cursor: 'pointer' }} />
              </Flex>
            </Badge>
          ))}
        </Flex>
      </Box>

      <Box gap="2">
        <Text>{e.key}</Text>
        <TextField.Root 
          variant="surface" 
          type="text" 
          placeholder="Ajouter"
          //value={inputValue}  // Liaison de l'input à l'état
          onChange={(e) => {
            console.log('e target', e.target.value);
            
            inputRef.current = e.target.value;
          }}  // Mise à jour de l'état lors du changement de valeur
         // onKeyPress={handleKeyPress}  // Détection de la touche Enter
        />
      </Box>
      
      <Button onClick={() => handleAddWord(e.key)}>
        <Flex direction="row" align="center" justify="center" gap="2">
          <PlusIcon />
          <Text>Ajouter</Text>
        </Flex>
      </Button></>)}
      
    </Flex>
  );
}
