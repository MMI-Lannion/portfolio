import { forwardRef, useEffect, useRef, useState } from 'react'
import {
  autoUpdate,
  size,
  flip,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  useFocus,
  useClick,
} from '@floating-ui/react'
import { Box, TextField } from '@radix-ui/themes'

interface ItemProps {
  children: React.ReactNode
  active: boolean
}

const Item = forwardRef<HTMLDivElement, ItemProps & React.HTMLProps<HTMLDivElement>>(
  ({ children, active, ...rest }, ref) => {
    const id = useId()
    return (
      <Box
        ref={ref}
        role='option'
        id={id}
        aria-selected={active}
        {...rest}
        style={{
          background: active ? 'var(--pink-8)' : 'none',
          padding: 6,
          borderRadius: 12,
          cursor: 'default',
          ...rest.style,
        }}>
        {children}
      </Box>
    )
  },
)

export function AutoComplete({ data, onSelect, placeholder, defaultValue }) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const listRef = useRef<Array<HTMLElement | null>>([])

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          })
        },
        padding: 10,
      }),
    ],
  })

  const role = useRole(context, { role: 'listbox' })
  const dismiss = useDismiss(context)
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  })

  const focus = useFocus(context)
  const click = useClick(context)

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    role,
    focus,
    click,
    dismiss,
    listNav,
  ])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)

    if (value) {
      setOpen(true)
      setActiveIndex(0)
    } else {
      setOpen(false)
    }
  }

  const items = data.filter((item) =>
    item.toLowerCase().startsWith(inputValue.toLowerCase()),
  )

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <>
      <TextField.Root
        defaultValue={inputValue}
        placeholder='Search the docs…'
        {...getReferenceProps({
          ref: refs.setReference,
          onChange,
          value: inputValue,
          placeholder: placeholder,
          'aria-autocomplete': 'list',
          onKeyDown(event) {
            if (event.key === 'Enter' && activeIndex != null && items[activeIndex]) {
              setInputValue(items[activeIndex])
              setActiveIndex(null)
              setOpen(false)
            }
          },
        })}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>

      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss>
            <Box
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...floatingStyles,
                  background: 'var(--gray-1)',
                  color: 'black',
                  overflowY: 'auto',
                },
              })}>
              {items.map((item, index) => (
                <Item
                  {...getItemProps({
                    key: item,
                    ref(node) {
                      listRef.current[index] = node
                    },
                    onClick() {
                      onSelect(item)
                      setInputValue(item)
                      setOpen(false)
                      refs.domReference.current?.focus()
                    },
                  })}
                  active={activeIndex === index}>
                  {item}
                </Item>
              ))}
            </Box>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}
