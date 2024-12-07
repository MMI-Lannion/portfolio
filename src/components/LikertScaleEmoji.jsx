import React from 'react'
import { Flex, Text, Radio } from '@radix-ui/themes'

function LikertScaleEmoji(e) {
  const handleChange = (e) => {
    console.log(e)
  }

  return (
    <>
      <span>{e.name}</span>
      <Flex
        align='start'
        direction='row'
        gap='5'>
        <Flex
          asChild
          gap='2'
          direction='column-reverse'
          onChange={handleChange}>
          <Text
            as='label'
            size='2'>
            <Radio
              name='example'
              value='20'
              defaultChecked
            />
            🤮
          </Text>
        </Flex>

        <Flex
          asChild
          gap='2'
          direction='column-reverse'
          onChange={handleChange}>
          <Text
            as='label'
            size='2'>
            <Radio
              name='example'
              value='40'
            />
            😠
          </Text>
        </Flex>

        <Flex
          asChild
          gap='2'
          direction='column-reverse'
          onChange={handleChange}>
          <Text
            as='label'
            size='2'>
            <Radio
              name='example'
              value='60'
            />
            🙂
          </Text>
        </Flex>

        <Flex
          asChild
          gap='2'
          direction='column-reverse'
          onChange={handleChange}>
          <Text
            as='label'
            size='2'>
            <Radio
              name='example'
              value='80'
            />
            😁
          </Text>
        </Flex>

        <Flex
          asChild
          gap='2'
          direction='column-reverse'
          onChange={handleChange}
          client:load>
          <Text
            as='label'
            size='2'>
            <Radio
              name='example'
              value='100'
            />
            🥳
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default LikertScaleEmoji
