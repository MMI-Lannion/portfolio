import { SunburstChart } from '@/components/SunburstChart'
import { $saeData, $updateHardskills, $updateTools } from '@/store/Store.js'
import { useStore } from '@nanostores/react'
import { Box, Flex, Tabs, Text } from '@radix-ui/themes'
import { Radar } from './Radar'

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
                  name={skillData.name}
                  data={skillData.data}
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
  const { softskills, softskillsTree } = useStore($saeData)

  return (
    <Flex justify='center'>
      <SunburstChart
        treeData={{ name: 'softskills', children: softskillsTree }}
        selected={softskills}
      />
    </Flex>
  )
}

export function ToolsRadar() {
  const outils = useStore($saeData)?.outils

  return (
    <Flex justify='center'>
      <Radar
        name='Outils et méthodes'
        data={outils}
        onChange={$updateTools}
      />
    </Flex>
  )
}
