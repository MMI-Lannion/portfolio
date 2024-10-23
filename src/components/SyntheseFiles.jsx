import React from 'react';
import InputFile from './InputFile';
import { $saeData, setSaeData } from '@/store/Store';
import { Flex, Text } from '@radix-ui/themes';
import { useStore } from '@nanostores/react';

const SyntheseFiles = () => {

    const filesNumber = useStore($saeData).files.length;

    return (
        <Flex direction="column">
            <InputFile onChange={(data) => {
            setSaeData({"files":data});
          }}/>
        <Text>Nombre de fichier : {filesNumber}</Text>
        </Flex>
        
    );
};

export default SyntheseFiles;