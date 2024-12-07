import React from 'react'
import { Box, Link, Heading, ScrollArea } from '@radix-ui/themes'
import { RemoveScroll } from 'react-remove-scroll'
import styles from './QuickNav.module.css'
import { useStore } from '@nanostores/react'
import { $saeData } from '@/store/Store'

export function QuickNav() {
  const [headings, setHeadings] = React.useState([])
  const saeData = useStore($saeData)

  React.useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('[data-heading]'))

    setHeadings(headingElements)
  }, [])

  // Function to determine the Heading Level based on `nodeName` (H2, H3, etc)
  const getLevel = (nodeName) => {
    return Number(nodeName.replace('H', ''))
  }

  return (
    <Box
      asChild
      // Components that hide the scrollbar (like Dialog) add padding to
      // account for the scrollbar gap to avoid layout jank. This does not
      // work for position: fixed elements. Since we use react-remove-scroll
      // under the hood for those primitives, we can add this helper class
      // provided by that lib to deal with that for the QuickNav.
      // https://github.com/radix-ui/website/issues/64
      // https://github.com/theKashey/react-remove-scroll#positionfixed-elements
      className={RemoveScroll.classNames.zeroRight}
      style={{
        position: 'fixed',
        flexShrink: 0,
        display: 'var(--quick-nav-display)',
        top: 100,
        width: 250,
        zIndex: 1,
        right: 0,
        bottom: 0,
      }}>
      <aside>
        <ScrollArea>
          <Box
            asChild
            px='5'
            aria-labelledby='site-quick-nav-heading'
            style={{
              paddingBlock: 68,
              display: headings.length === 0 ? 'none' : 'block',
            }}>
            <nav>
              <Heading
                mb='3'
                size='4'
                id='site-quick-nav-heading'
                asChild>
                <h4>Quick nav</h4>
              </Heading>
              <Box
                asChild
                p='0'
                style={{ listStyle: 'none' }}>
                <ul>
                  {headings.map(({ id, nodeName, innerText }) => {
                    return (
                      <Box
                        asChild
                        key={id}
                        data-level={getLevel(nodeName)}
                        className={styles.LinkWrapper}>
                        <li>
                          <Link
                            href={`#${id}`}
                            color='gray'
                            size='2'
                            className={styles.Link}>
                            {innerText}
                          </Link>
                        </li>
                      </Box>
                    )
                  })}
                </ul>
              </Box>
            </nav>
          </Box>
        </ScrollArea>
      </aside>
    </Box>
  )
}
