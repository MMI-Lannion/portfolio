import { ButtonPrev } from '@/components/ButtonNext'
import { PageHeading, PageText } from '@/components/Typography'
import { Flex } from '@radix-ui/themes'

export default function Merci() {
  return (
    <>
      <PageHeading
        title="C'est fait"
        badgeTitle='✅'
        badgeColor='green'
      />

      <PageText>Merci d'avoir compléter la saisie</PageText>

      <Flex
        justify='end'
        direction='row'
        m='3'
        gapX='3'>
        <ButtonPrev
          name="Page d'accueil"
          href='/'
        />
      </Flex>
    </>
  )
}
