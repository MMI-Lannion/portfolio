import { ButtonNext, ButtonPrev } from '@/components/ButtonNext'
import { PageHeading, PageSubHeading, PageText } from '@/components/Typography'
import {
  HardskillsRadar,
  SoftskillsSunburst,
  ToolsRadar,
} from '@/components/SkillsAndTools'
import { Flex, Separator } from '@radix-ui/themes'
import { QuickNav } from '@/components/QuickNav'

export default function AutoEvaluation() {
  return (
    <>
      <QuickNav client:load />

      <PageHeading
        title='Auto-évaluation'
        badgeTitle='Etape 2'
        badgeColor='purple'
      />

      <Flex
        direction='column'
        gap='5'
        width='100%'
        mb='6'>
        <Flex
          direction='column'
          gap='3'>
          <PageText>
            Je m’auto-évalue sur les hardskills, softksills ainsi que sur les outils et
            méthodes utilisés en projet
          </PageText>

          <PageSubHeading title='Hardskills' />

          <PageText>
            Estimez votre niveau de maitrise de chaque sous compétence, dans chaque
            onglets, sur une échelle de 1 à 5<br />
            <strong>1</strong> = Pas du tout maitrisé ; <strong>5</strong> = Tout à fait
            maitrisé
          </PageText>

          <HardskillsRadar client:only />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'>
          <PageSubHeading title='Softskills' />

          <PageText>
            Parcourir et sélectionner le ou les softskill(s) que vous avez utilisé(s),
            directement sur le dernier niveau du graphique
          </PageText>

          <SoftskillsSunburst client:only />
        </Flex>

        <Separator style={{ width: '30%' }} />

        <Flex
          direction='column'
          gap='2'>
          <PageSubHeading title='Outils et méthodes' />

          <PageText>
            Estimez votre niveau de maitrise pour chaque outil et/ou méthode sur une
            échelle de 1 à 5 <br />
            <strong>1</strong> = Pas du tout maitrisé ; <strong>5</strong> = Tout à fait
            maitrisé
          </PageText>

          <ToolsRadar client:only />
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
          href='/synthese'
        />
        <ButtonNext
          name='Suivant'
          href='/plan-actions'
        />
      </Flex>
    </>
  )
}
