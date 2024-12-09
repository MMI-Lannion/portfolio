import { ButtonPrev } from '@/components/ButtonNext'
import { ButtonValidate } from '@/components/ButtonValidate'
import { CheckList } from '@/components/CheckList'
import { Combobox } from '@/components/Combobox'
import EditableTextArea from '@/components/EditableTextArea'
import { QuickNav } from '@/components/QuickNav'
import { PageHeading, PageSubHeading, PageText } from '@/components/Typography'
import { Flex, Separator, Text } from '@radix-ui/themes'
import TableActionPlan from '../components/TableActionPlan'
import { $sae } from '@/store/Store'

export default function PlanActions() {
  return (
    <>
      <QuickNav />

      <PageHeading
        title="Plan d'actions"
        badgeTitle={`${$sae.get()} - Etape 3/3`}
        badgeColor='green'
      />

      <Flex
        direction='column'
        gap='5'
        width='100%'
        mb='6'>
        <Flex
          direction='column'
          gap='3'
          width='100%'>
          <PageText>
            Je mets en place un plan d'actions pour progresser sur mes hardskills
          </PageText>

          <PageSubHeading title='Hardskills' />

          <PageText>Sélectionner la compétence que vous souhaitez améliorer</PageText>

          <Combobox />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'>
          <PageSubHeading title="Mes axes d'améliorations" />

          <PageText>
            Selon votre compétence à améliorer, cliquez sur un des quatre cadrans de
            progression
          </PageText>

          <TableActionPlan />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Sous-Compétence' />

          <PageText> Selectionnez les sous-compétences à améliorer </PageText>

          <CheckList />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'
          width='100%'>
          <PageSubHeading title='Actions à mener' />

          <EditableTextArea
            placeholder='Décrire le ou les actions SMART à mettre en place'
            dataKey='actions'
          />
        </Flex>
      </Flex>

      <Flex
        justify='end'
        align='end'
        direction='row'
        m='3'
        gapX='3'>
        <ButtonPrev
          name='Précédent'
          href='/auto-evaluation'
        />
        <ButtonValidate />
      </Flex>
    </>
  )
}
