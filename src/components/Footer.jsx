import { Text, Flex, Separator } from '@radix-ui/themes'
import { Link } from 'raviger'

export function Footer() {
  return (
    <Flex
      style={{ height: 42 }}
      direction='column'
      justify='center'
      align='center'
      gap='3'>
      <Separator
        size='1'
        orientation='horizontal'
        style={{
          width: '90%',
        }}
      />
      <Flex
        justify='center'
        align='center'
        gap='3'
        width='100%'
        px='3'>
        <Flex
          width='200px'
          justify='end'>
          <Link
            href='/demarche-portfolio'
            color='white'
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Text>IUT Lannion, MMI, Portfolio</Text>
          </Link>
        </Flex>
        <Flex
          width='200px'
          justify='end'>
          <Link
            href='/mentions-legales'
            color='white'
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Text>Mentions légales</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
