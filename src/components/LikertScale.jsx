import { Flex, Text, Radio, Grid, Box } from '@radix-ui/themes'
import { $saeData, $updateHardskills, $setSaeData } from '@/store/Store.js'
import { useStore } from '@nanostores/react'
import React, { useEffect, useRef, useState } from 'react'

function LikertScale({ competence, label, value, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value
    onChange({ competence, label, value })
    // $updateHardskills(competence, label, value);
  }

  return (
    <Flex
      direction='column'
      gap='4'>
      <Text
        size='2'
        weight='bold'>
        {competence} - {label}
      </Text>
      <Flex
        direction='column'
        gap='8'>
        <Grid
          p='2'
          columns='5'
          gap='1'
          rows='repeat(1, 44px)'
          width='100%'>
          {/* <Flex direction="column" align="center">
          <Box>😔</Box>
          <Text as="label" size="2">
            Galère
          </Text>
        </Flex> */}
          <Flex
            direction='column'
            align='center'>
            <Box>😲</Box>
            <Text
              as='label'
              size='2'
              align='center'>
              1 - Pas du tout maitrisé
            </Text>
          </Flex>
          <Flex
            direction='column'
            align='center'>
            <Box>🤔</Box>
            <Text
              as='label'
              size='2'
              align='center'>
              2 - Un peu maitrisé
            </Text>
          </Flex>
          <Flex
            direction='column'
            align='center'>
            <Box>😊</Box>
            <Text
              as='label'
              size='2'
              align='center'>
              3 - Moyennement maitrisé
            </Text>
          </Flex>
          <Flex
            direction='column'
            align='center'>
            <Box>😁</Box>
            <Text
              as='label'
              size='2'
              align='center'>
              4 - Plutôt maitrisé
            </Text>
          </Flex>
          <Flex
            direction='column'
            align='center'>
            <Box>🤩</Box>
            <Text
              as='label'
              size='2'
              align='center'>
              5 - Tout à fait maitrisé
            </Text>
          </Flex>
        </Grid>

        <Grid
          columns='5'
          gap='3'
          rows='repeat(1, 44px)'
          width='auto'>
          {/* <Flex direction="column">
          <Radio
            value="0"
            defaultChecked={value == "0"}
            checked={value == "0"}
            onChange={handleChange}
          />
        </Flex> */}
          <Flex direction='column'>
            <Radio
              value='0.1'
              defaultChecked={value == '0.1'}
              checked={value == '0.1'}
              onChange={handleChange}
            />
          </Flex>
          <Flex direction='column'>
            <Radio
              value='0.2'
              defaultChecked={value == '0.2'}
              checked={value == '0.2'}
              onChange={handleChange}
            />
          </Flex>
          <Flex direction='column'>
            <Radio
              value='0.3'
              defaultChecked={value == '0.3'}
              checked={value == '0.3'}
              onChange={handleChange}
            />
          </Flex>
          <Flex direction='column'>
            <Radio
              value='0.4'
              defaultChecked={value == '0.4'}
              checked={value == '0.4'}
              onChange={handleChange}
            />
          </Flex>
          <Flex direction='column'>
            <Radio
              value='0.5'
              defaultChecked={value == '0.5'}
              checked={value == '0.5'}
              onChange={handleChange}
            />
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
}

export default LikertScale
