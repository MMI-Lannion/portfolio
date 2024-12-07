import { $isLoggedIn, $logout, $theme, $toggleTheme } from '@/store/Store'
import { useStore } from '@nanostores/react'
import {
  DashboardIcon,
  InfoCircledIcon,
  MoonIcon,
  PersonIcon,
  RocketIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Link } from '@radix-ui/themes'
import { navigate } from 'raviger'

export function Header() {
  const theme = useStore($theme)
  const isLoggedIn = useStore($isLoggedIn)

  return (
    <Flex style={{ boxShadow: 'var(--shadow-3)', height: 46, width: '100vw' }}>
      <Flex
        justify='between'
        align='center'
        gap='3'
        width='100%'
        margin='0 auto'
        px='5'>
        <Flex gap='6'>
          <Link href='/'>
            <RocketIcon
              height='22'
              width='22'
            />
          </Link>

          <Flex
            justify='center'
            align='center'
            gap='4'>
            <Link
              href='/tutoriel'
              color='white'>
              <Button
                variant='ghost'
                size='4'>
                <InfoCircledIcon
                  height='22'
                  width='22'
                />
                Tutoriel
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Flex
          justify='center'
          align='center'
          direction='row'
          gap='5'>
          <Link
            href='/dashboard'
            color='white'>
            <Button
              variant='ghost'
              size='4'>
              <DashboardIcon
                height='22'
                width='22'
              />
              Dashboard
            </Button>
          </Link>

          {isLoggedIn && (
            <Button
              variant='ghost'
              size='4'
              onClick={async () => {
                await $logout()
                navigate('/')
              }}>
              <PersonIcon />
              Se deconnecter
            </Button>
          )}

          <Button
            variant='ghost'
            size='4'
            onClick={$toggleTheme}>
            {theme === 'dark' ? (
              <SunIcon
                height='22'
                width='22'
              />
            ) : (
              <MoonIcon
                height='22'
                width='22'
              />
            )}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
