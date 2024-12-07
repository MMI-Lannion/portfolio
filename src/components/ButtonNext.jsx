import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { navigate } from 'raviger'

export function ButtonNext({ href, name, onClick = null }) {
  return (
    <Button
      size='4'
      variant='surface'
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        navigate(href)
      }}>
      {name}
      <ArrowRightIcon />
    </Button>
  )
}

export function ButtonPrev({ href, name, onClick = null }) {
  return (
    <Button
      size='4'
      variant='surface'
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        navigate(href)
      }}>
      <ArrowLeftIcon />
      {name}
    </Button>
  )
}
