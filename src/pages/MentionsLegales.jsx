import { PageHeading } from '@/components/Typography'
import { Box, Flex } from '@radix-ui/themes'
import { ButtonPrev } from '@/components/ButtonNext'

export default function MentionsLegales() {
  return (
    <>
      <PageHeading title='Mentions légales' />

      <Flex
        direction='column'
        gap='5'
        width='100%'
        mb='6'>
        <Box>
          Le site web dédié à la démarche Portfolio a été co-créé avec les étudiants BUT3
          de la spécialité « Développement web et dispositifs interactifs » :
        </Box>

        <Box>
          David Bobet, Théo Hervé, Damien Kowalski, Colin Lallauret, Théo Le Gourrierec et
          Corentin Robac.
        </Box>

        <Box>
          Et avec l’équipe pédagogique MMI : Agathe Célérier, Grégoire Cliquet, Mohamed Ez
          Zaouia, Yoan Fontaine et Corinne Schuchard.
        </Box>

        <Box> ©IUT de Lannion, BUT MMI, 2024. </Box>
      </Flex>

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
