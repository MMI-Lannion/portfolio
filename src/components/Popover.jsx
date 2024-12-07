import { Button, Popover as RadixPopover } from '@radix-ui/themes'
import InfoCircled from './InfoCircled'

export function Popover({ children = <InfoCircled />, content = null }) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger>
        <Button variant='soft'>{children}</Button>
      </RadixPopover.Trigger>
      <RadixPopover.Content
        maxWidth='360px'
        maxHeight='500px'>
        {content}
      </RadixPopover.Content>
    </RadixPopover.Root>
  )
}
