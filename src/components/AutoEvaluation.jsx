// AutoEvaluation.

import React from 'react';
import { Radar } from './Radar';
import { Flex, Text } from '@radix-ui/themes';

export default function AutoEvaluation() {

    // datas to send to radars
    const datasRadar1 = {};
    const datasRadar2 = {};
    const datasRadar3 = {};

    return (
        <Flex gap="4" direction="column">
            <Flex>
                <Text size="4">Sous-titre</Text >
            </Flex>
            <Flex gap="2" direction="column">
                <Text size="4">Titre</Text >
                <Text size="2">Texte</Text >
                <Radar datasRadar1={datasRadar1}/>
            </Flex>
            <Flex gap="2" direction="column">
                <Text >Logoden biniou degemer mat, an. Kelenn itron kambr mar, houarn. Ac’hanout perak hent kaout, pediñ. Verc’h aon ennon prenañ, kurun. Eil honnezh vuoc’h beajourien, doujañs. Panevet  kemmañ den gontell, ar. Skrijañ c’hleñved vuhez gwrierez, kerf. Tre koan lien gwaskañ, Pleiber-Krist. Penn anavezout doñjer frout, houad. Evezh tregont gwriat huñvre, Mederieg.</Text >
                <Text >Logoden biniou degemer mat, an. Kelenn itron kambr mar, houarn. Ac’hanout perak hent kaout, pediñ. Verc’h aon ennon prenañ, kurun. Eil honnezh vuoc’h beajourien, doujañs. Panevet  kemmañ den gontell, ar. Skrijañ c’hleñved vuhez gwrierez, kerf. Tre koan lien gwaskañ, Pleiber-Krist. Penn anavezout doñjer frout, houad. Evezh tregont gwriat huñvre, Mederieg.</Text >
                <Radar datasRadar2={datasRadar2}/>
            </Flex>
            <Flex gap="2" direction="column">
                <Text >Logoden biniou degemer mat, an. Kelenn itron kambr mar, houarn. Ac’hanout perak hent kaout, pediñ. Verc’h aon ennon prenañ, kurun. Eil honnezh vuoc’h beajourien, doujañs. Panevet  kemmañ den gontell, ar. Skrijañ c’hleñved vuhez gwrierez, kerf. Tre koan lien gwaskañ, Pleiber-Krist. Penn anavezout doñjer frout, houad. Evezh tregont gwriat huñvre, Mederieg.</Text >
                <Text >Logoden biniou degemer mat, an. Kelenn itron kambr mar, houarn. Ac’hanout perak hent kaout, pediñ. Verc’h aon ennon prenañ, kurun. Eil honnezh vuoc’h beajourien, doujañs. Panevet  kemmañ den gontell, ar. Skrijañ c’hleñved vuhez gwrierez, kerf. Tre koan lien gwaskañ, Pleiber-Krist. Penn anavezout doñjer frout, houad. Evezh tregont gwriat huñvre, Mederieg.</Text >
                <Radar datasRadar3={datasRadar3}/>
            </Flex>
        </Flex>
    );
  }
  