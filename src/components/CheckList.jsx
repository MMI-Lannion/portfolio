import { $saeData, $sousCompetences, $updateSousCompetences } from '@/store/Store'
import { useStore } from '@nanostores/react'
import { CheckboxGroup, Flex, Text } from '@radix-ui/themes'

export function CheckList() {
  const sousCompetences = useStore($sousCompetences) || []
  const checked = useStore($saeData).sousCompetences || []

  return (
    <CheckboxGroup.Root
      size='3'
      defaultValue={[]}
      name='sous-competences'
      onValueChange={$updateSousCompetences}>
      {sousCompetences.map((option) => (
        <Text
          as='label'
          size='4'
          key={option.key}>
          <Flex gap='2'>
            <CheckboxGroup.Item
              checked={checked.includes(option.key)}
              value={option.key}>
              {option.key}
            </CheckboxGroup.Item>
          </Flex>
        </Text>
      ))}
    </CheckboxGroup.Root>
  )
}
