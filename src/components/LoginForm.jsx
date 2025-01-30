import { $login, $setUser, $user } from '@/store/Store'
import { useStore } from '@nanostores/react'
import { EyeClosedIcon, EyeOpenIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'
import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  IconButton,
  RadioCards,
  Text,
  TextField,
} from '@radix-ui/themes'
import { useState } from 'react'
import { PageSubHeading } from './Typography'
import { styled } from '@/lib/stitches'

const RadioItem = styled(RadioCards.Item, {
  cursor: 'pointer !important',
  '&:hover': {
    background: 'var(--accent-10)',
  },
})

const LoginForm = () => {
  const user = useStore($user)
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'>
      <Flex
        direction='column'
        align='center'
        mb='4'>
        <Text
          size='6'
          mb='8'
          align='center'>
          Bienvenue sur le site dédié à la Démarche Portfolio : Synthétiser vos projets,
          réaliser un bilan sur vos compétences et miser sur vos axes d'améliorations tout
          au long de votre cursus MMI. La finalité de ce site est de vous apporter des
          contenus pour ensuite enrichir votre profil LinkedIn et votre propre site web
          personnel
        </Text>

        <PageSubHeading title='Se connecter' />
      </Flex>

      <Card style={{ width: '100%', maxWidth: '400px', padding: 24 }}>
        {showError && (
          <Callout.Root color='red'>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>Nom utilisateur ou mot de passe invalide</Callout.Text>
          </Callout.Root>
        )}

        <form
          style={{ width: '100%' }}
          onSubmit={async (e) => {
            e.preventDefault()
            const valide = await $login()
            setShowError(!valide)
          }}>
          <Flex
            gap='4'
            direction='column'
            width='100%'>
            <Flex
              gap='2'
              direction='column'
              width='100%'>
              <Label
                htmlFor='email'
                size='2'
                display='block'>
                <Text size='6'>BUT</Text>
              </Label>

              <Flex
                justify='center'
                width='100%'>
                <RadioCards.Root
                  columns='3'
                  onValueChange={(value) => {
                    $setUser({ but: value })
                  }}>
                  <RadioItem value='BUT1'>
                    <Flex
                      direction='column'
                      width='100%'>
                      <Text weight='bold'>BUT 1</Text>
                    </Flex>
                  </RadioItem>
                  <RadioItem value='BUT2'>
                    <Flex
                      direction='column'
                      width='100%'>
                      <Text weight='bold'>BUT 2</Text>
                    </Flex>
                  </RadioItem>
                  <RadioItem value='BUT3'>
                    <Flex
                      direction='column'
                      width='100%'>
                      <Text weight='bold'>BUT 3</Text>
                    </Flex>
                  </RadioItem>
                </RadioCards.Root>
              </Flex>
            </Flex>
            {/* Email Input */}
            <Flex
              gap='2'
              direction='column'
              width='100%'>
              <Label
                htmlFor='username'
                size='2'
                display='block'>
                <Text size='6'>Nom utilisateur</Text>
              </Label>

              <TextField.Root
                size='3'
                type='text'
                id='username'
                name='username'
                required
                placeholder='Nom utilisateur'
                onChange={(e) => {
                  console.log('Email field value:', e.target.value)
                  $setUser({ username: e.target.value })
                }}
              />
            </Flex>
            {/* Password Input with Show/Hide Password Button */}
            <Flex
              gap='2'
              direction='column'>
              <Label
                htmlFor='password'
                size='2'
                marginBottom='1'
                display='block'>
                <Text size='6'>Mot de passe</Text>
              </Label>
              <TextField.Root
                size='3'
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                required
                autoComplete='current-password'
                placeholder='Mot de passe'
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const disabled = !user?.username || !user?.password || !user?.but
                    if (!disabled) {
                      const valide = await $login()
                      setShowError(!valide)
                    }
                  }
                }}
                onChange={(e) => {
                  console.log('Password field value:', e.target.value)
                  $setUser({ password: e.target.value })
                }}>
                <TextField.Slot></TextField.Slot>
                <TextField.Slot pr='3'>
                  <IconButton
                    size='4'
                    variant='ghost'
                    onClick={(e) => {
                      e.preventDefault()
                      handleTogglePassword() // Call toggle password function
                    }}>
                    {showPassword ? (
                      <EyeClosedIcon
                        height='16'
                        width='16'
                      />
                    ) : (
                      <EyeOpenIcon
                        height='16'
                        width='16'
                      />
                    )}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Flex>
            {/* Submit Button */}
            <Button
              size='4'
              type='submit'
              variant='solid'
              width='100%'
              disabled={!user?.username || !user?.password || !user?.but}>
              Login
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}

export default LoginForm
