import { ButtonNext, ButtonPrev } from '@/components/ButtonNext'
import EditableTextArea from '@/components/EditableTextArea'
import SyntheseFiles from '@/components/SyntheseFiles'
import { TreeMap } from '@/components/TreeMap'
import { PageHeading, PageSubHeading, PageText } from '@/components/Typography'
import { Flex, Separator } from '@radix-ui/themes'
import { QuickNav } from '@/components/QuickNav'
import { $sae } from '@/store/Store'

export default function Synthese() {
  return (
    <>
      <QuickNav />

      <PageHeading
        title='Synthèse'
        badgeTitle={`${$sae.get()} - Etape 1/3`}
        badgeColor='pink'
      />

      <Flex
        direction='column'
        gap='5'
        width='100%'
        mb='6'>
        <Flex
          direction='column'
          gap='3'>
          <PageText>Je rédige une fiche de synthèse du projet</PageText>

          <PageSubHeading title='Treemap' />

          <PageText>
            Cliquer sur chaque forme pour saisir des mots clés correspondants aux blocs de
            compétences concernés. <br />
            Ne pas dépasser : « indiquer la valeur max. par bloc ».
          </PageText>

          <TreeMap />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Contexte et Objectifs' />

          <EditableTextArea
            placeholder="Expliquer en quelques lignes : le contexte du projet, de l'entreprise, ses valeurs, ses enjeux. Formuler l'objectif de la SAE, ce qui vous est demandé"
            dataKey='contexte'
          />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Démarche de Projet > Etapes' />

          <EditableTextArea
            placeholder={
              'Expliquer en quelques lignes votre démarche projet ainsi quel es étapes/actions que vous avez mis en place pour réaliser les livrables'
            }
            dataKey='demarche'
          />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Livrables attendus' />

          <EditableTextArea
            placeholder={'Nommer les livrables réalisés'}
            dataKey='livrable'
          />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Pièces Jointes' />

          <PageText>
            Importer une ou plusieurs « traces » de vos réalisations (jpeg, png, pdf, mp4,
            doc). Ne pas dépasser « indiquer la valeur maximum pour le téléchargement »
          </PageText>

          <SyntheseFiles />
        </Flex>

        <Separator style={{ width: '30%' }} />
      </Flex>

      <Flex
        justify='end'
        direction='row'
        m='3'
        gapX='3'>
        <ButtonPrev
          name='Précédent'
          href='/'
        />
        <ButtonNext
          name='Suivant'
          href='/auto-evaluation'
        />
      </Flex>
    </>
  )
}
