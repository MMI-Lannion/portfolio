import {
  $saeData,
  $setSaeData,
  $sousCompetences,
  $updateSousCompetences,
} from '@/store/Store'
import { useStore } from '@nanostores/react'
import { CheckboxGroup, Flex, Text } from '@radix-ui/themes'

export function CheckList() {
  const sousCompetences = useStore($sousCompetences) || {}
  const checked = useStore($saeData).sousCompetences || []

  console.log('sousCompetences', checked)

  return (
    <CheckboxGroup.Root
      size='3'
      defaultValue={[]}
      name='sous-competences'
      onValueChange={$updateSousCompetences}>
      {Object.keys(sousCompetences).map((key) => (
        <Text
          as='label'
          size='4'
          key={key}>
          <Flex gap='2'>
            <CheckboxGroup.Item
              checked={checked.includes(key)}
              value={key}>
              {key}
            </CheckboxGroup.Item>
          </Flex>
        </Text>
      ))}
    </CheckboxGroup.Root>
  )
}
