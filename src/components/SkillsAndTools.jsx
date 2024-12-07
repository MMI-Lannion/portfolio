import { $saeData, $updateHardskills, $updateTools } from '@/store/Store.js'
import { useStore } from '@nanostores/react'
import { Box, Flex, Tabs, Text } from '@radix-ui/themes'
import { Radar } from './Radar'
import { SunburstChart } from './SunburstChart'

export function HardskillsRadar() {
  const hardskills = useStore($saeData)?.hardskills

  return (
    <Flex direction='column'>
      <Tabs.Root defaultValue={hardskills?.[0]?.name}>
        <Tabs.List justify='start'>
          {hardskills.map((skillData) => (
            <Tabs.Trigger
              key={skillData.name}
              value={skillData.name}>
              <Flex>
                {skillData.name.length > 24
                  ? `${skillData.name.slice(0, 24)}...`
                  : skillData.name}
              </Flex>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box pt='3'>
          {hardskills.map((skillData) => (
            <Tabs.Content
              key={skillData.name}
              value={skillData.name}>
              <Flex
                direction='column'
                align='center'
                gap='2'>
                <Text weight='bold'>{skillData.name}</Text>

                <Radar
                  datas={[{ name: skillData.name, ...skillData.data }]}
                  onChange={$updateHardskills}
                />
              </Flex>
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </Flex>
  )
}

export function SoftskillsSunburst() {
  return (
    <Flex justify='center'>
      <SunburstChart />
    </Flex>
  )
}

export function ToolsRadar() {
  const outils = useStore($saeData)?.outils

  return (
    <Flex justify='center'>
      <Radar
        datas={[{ name: 'Outils et méthodes', ...outils }]}
        onChange={$updateTools}
      />
    </Flex>
  )
}
