import React, { useState, useRef } from 'react';
import { CrossCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Flex, Text, Button, Badge, TextField, Heading, Box} from "@radix-ui/themes";

export default function AddWordsToTreeMap({ onWordsUpdate }) {
  const inputRef = useRef();
  const [localWords, setLocalWords] = useState([]); 
 // const [inputValue, setInputValue] = useState(''); 

  const handleAddWord = () => {
    const inputValue = inputRef.current?.trim();
    console.log('ref', inputRef.current,inputValue);
    
    if (inputValue) { // Vérifie que l'input n'est pas vide
      const updatedWords = [...localWords, inputValue]; 
      setLocalWords(updatedWords); 
      onWordsUpdate(updatedWords); 
    //  setInputValue(''); // Réinitialise le champ texte
    }
  };

  // Permet de capturer la touche "Enter" et d'exécuter handleAddWord
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  const handleRemoveWord = (index) => {
    const updatedWords = localWords.filter((_, i) => i !== index); // Supprime le mot à l'index spécifié
    setLocalWords(updatedWords); 
    onWordsUpdate(updatedWords); // Met à jour le parent
  };

  return (
    <Flex direction="column" gap="4">
      <Heading size="6">Ajouter vos mots clés</Heading>
      <Box gap="2">
        <Text>Mots clés :</Text>
        <Flex gap="4">
          {localWords.map((word, index) => (
            <Badge color="blue" key={index}>
              <Flex direction="row" align="center" justify="center" gap="2">
                <Text>{word}</Text>
                <CrossCircledIcon onClick={() => handleRemoveWord(index)} style={{ cursor: 'pointer' }} />
              </Flex>
            </Badge>
          ))}
        </Flex>
      </Box>

      <Box gap="2">
        <Text>Entrez vos mots clé ici :</Text>
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
      
      <Button onClick={handleAddWord}>
        <Flex direction="row" align="center" justify="center" gap="2">
          <PlusIcon />
          <Text>Ajouter</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
