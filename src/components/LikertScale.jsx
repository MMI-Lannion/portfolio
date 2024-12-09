import { Box, Code, Em, Flex, Grid, Radio, Text } from '@radix-ui/themes'

function LikertScale({ competence, label, data, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value
    onChange({ competence, label, value })
  }

  const { value, detail } = data || {}

  return (
    <Flex
      direction='column'
      gap='4'>
      <Text
        size='2'
        weight='bold'>
        Hardskill : {competence}
      </Text>
      <Text
        size='2'
        weight='medium'>
        <Code>{label}</Code>
      </Text>
      <Flex
        direction='column'
        gap='4'>
        <Grid
          p='2'
          columns='5'
          gap='1'
          rows='repeat(1, 44px)'
          width='100%'>
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
      {detail != '0' && (
        <Text>
          <Em>
            Détails :{' '}
            <Text
              dangerouslySetInnerHTML={{
                __html: detail,
              }}></Text>
          </Em>
        </Text>
      )}
    </Flex>
  )
}

export default LikertScale
