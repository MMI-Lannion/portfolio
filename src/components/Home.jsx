import { $loadUserSaeData, $loadUserSaes, $setSae, $userSeas } from '@/store/Store'
import { useStore } from '@nanostores/react'
import {
  ArrowRightIcon,
  ChatBubbleIcon,
  CheckIcon,
  Cross2Icon,
} from '@radix-ui/react-icons'
import { Badge, Button, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { PageHeading } from './Typography'
import { navigate } from 'raviger'

export function Home() {
  const userSeas = useStore($userSeas)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(async () => {
      await $loadUserSaes()
    }, 0)
  }, [])

  return (
    <>
      <PageHeading title='Mes SAEs' />

      <Flex
        gap='4'
        wrap='wrap'
        justify='center'>
        {userSeas.map((element) => (
          <Flex key={element.name}>
            <Card
              style={{
                // minHeight: "200px",
                width: '370px',
              }}>
              <Flex
                direction='row'
                gap='3'
                m='1'
                height='100%'>
                <Flex
                  width='80%'
                  direction='column'
                  gap='2'>
                  <Heading size='4'>
                    {element.name}{' '}
                    {element.completed ? (
                      <>
                        <Badge
                          color='green'
                          size='3'>
                          <CheckIcon />
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Badge
                          color='red'
                          size='3'>
                          <Cross2Icon />
                        </Badge>
                      </>
                    )}
                  </Heading>
                  <Text
                    width='70%'
                    size='4'
                    style={{
                      overflow: 'auto',
                      flex: 1,
                      wordWrap: 'break-word',
                    }}>
                    {element.description}
                  </Text>
                </Flex>

                <Separator
                  orientation='vertical'
                  style={{ height: '90%' }}
                />

                <Flex
                  align='end'
                  justify='center'
                  gap='3'
                  width='20%'
                  direction='column'>
                  <Button
                    size='3'
                    variant='solid'
                    disabled={loading}
                    onClick={async (e) => {
                      e.preventDefault()
                      setLoading(true)
                      await $setSae(element.name)
                      await $loadUserSaeData()
                      setTimeout(() => {
                        navigate('/synthese')
                      }, 10)
                    }}>
                    <ArrowRightIcon />
                  </Button>

                  <Button
                    size='3'
                    variant='solid'
                    color='indigo'
                    disabled={loading}
                    onClick={async (e) => {
                      e.preventDefault()
                      setLoading(true)
                      await $setSae(element.name)
                      await $loadUserSaeData()
                      setTimeout(() => {
                        navigate('/feedback')
                      }, 10)
                    }}>
                    <ChatBubbleIcon />
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        ))}
      </Flex>
    </>
  )
}
