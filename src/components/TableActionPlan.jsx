import { $saeData, $updateAxeAmelioration } from '@/store/Store'
import { useStore } from '@nanostores/react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Box, Em, Flex, Radio, Text } from '@radix-ui/themes'
import InfoCircled from './InfoCircled'
import './action-plan.css'

const titles = [
  'Peu de connaissance / Mise en pratique forte',
  'Excellente connaissance / Mise en application forte',
  'Peu de connaissance / Peu de mise en pratique',
  'Excellente connaissance / Peu de mise en application',
]

const commentaites = [
  // appliquer le savoir
  `
  « Je révise mon savoir pour le mettre en application »
<br />
> Je relis mes cours, réalise des fiches-notes.
<br />
> J’utilise les connaissances, méthodes et outils de mes cours pour proposer des solutions professionnelles (complètes et adaptées au contexte).
<br />
> Je suis force de proposition sur des démarches à mettre en place (méthodologie/outils, nombre de propositions…).
  `,
  // se perfectionner
  `
  « J’y suis arrivé … Je continue dans cette lancée ! »
  <br />
> Je suis exigeant, j’approfondis.
<br />
> J’aide les autres à monter en compétences.
  `,
  // appliquer
  `
« Je ne lâche rien, je m’accroche »
<br />
> Identifier mes points bloquants (les causes)
<br />
> Identifier mes leviers de motivation
<br />
> Identifier un plan de progression
<br />
> Identifier les personnes « ressources » (qui vont m’aider à progresser)
<br />
> Organiser et proposer des points réguliers avec l’enseignant tuteur par rapport à mon plan de progression.
`,
  // oser
  `
« Je sais et c’est le moment de mettre en application »
<br />
> Définir un plan de développement
<br />
> Saisir les opportunités pour mettre en pratique (au sein d’un projet, d’une association, de l’IUT)
<br />
> Organiser et proposer des points réguliers avec l’enseignant tuteur par rapport à mon plan de progression.

`,
]

const colors = ['yellow', 'purple', 'teal', 'grey']

function TableActionPlan() {
  const defaultValue = useStore($saeData)?.axeAmelioration

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto 1fr',
          gap: '5px',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            textAlign: 'center',
            textOrientation: 'mixed',
            // writingMode: "vertical-lr",
            width: 'fit-content',
          }}>
          <Flex direction='column'>
            <Text weight='bold'>Savoir faire</Text>
            <Text>
              <Em>
                Ce que je mets <br /> en application{' '}
              </Em>
            </Text>
          </Flex>
          <InfoCircled text='Ce que je mets en application' />
        </div>
        <div>
          <Flex
            direction='column'
            gap='2'>
            <ArrowRightIcon
              style={{ transform: 'rotate(-90deg) translate(-20px, -7px)' }}
            />
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '10px',
                borderLeft: '1px solid black',
                borderBottom: '1px solid black',
                padding: '10px',
                textAlign: 'center',
              }}>
              {[
                'Appliquer le savoir',
                'Se perfectionner',
                'Retravailler les bases',
                'Oser',
              ].map((label, index) => {
                return (
                  <Flex
                    key={label}
                    direction='column'
                    justify='center'
                    gap='2'
                    className={`flex-item ${colors[index]}`}
                    onClick={$updateAxeAmelioration.bind(null, label)}>
                    <InfoCircled text={commentaites[index]} />
                    <Text style={{ color: '#fff' }}>{titles[index]}</Text>
                    <Text
                      weight='medium'
                      size='4'
                      className='flex-item-span'>
                      {label}
                    </Text>
                    <Radio
                      className='flex-item-checkbox'
                      name='example'
                      value={label}
                      defaultChecked={label === defaultValue}
                    />
                  </Flex>
                )
              })}
            </Box>
            <ArrowRightIcon
              style={{
                marginLeft: 'auto',
                transform: 'translate(2px, -16px)',
              }}
            />
          </Flex>
        </div>
        <div id='empty'></div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '5px',
            textAlign: 'center',
          }}>
          <Flex direction='column'>
            <Text weight='bold'>Savoir</Text>
            <Text>
              <Em>Ce que je connais </Em>
            </Text>
          </Flex>
          <InfoCircled text='Ce que je connais' />
        </div>
      </div>
    </>
  )
}

export default TableActionPlan
