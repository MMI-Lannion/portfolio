import PlotFigure from '@/lib/PlotFigure'
import * as Plot from '@observablehq/plot'
import * as d3 from 'd3'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import LikertScale from '@/components/LikertScale'
import { Box } from '@radix-ui/themes'
import { Dialog } from './Dialog'

function calculateYPosition(index, numAxes) {
  if (index === 0 || (numAxes % 2 === 0 && index === numAxes / 2)) {
    return 90 - 0.7
  }

  return 90 - 0.74
}

function getLabelTextFromNode(element) {
  let label = ''

  if (element.hasChildNodes()) {
    const children = element.childNodes

    for (const node of children) {
      label += ' ' + node.textContent
    }
  } else {
    label = element.textContent
  }

  return label.trim()
}

function splitTextIntoLines(text, wordsPerLine) {
  const words = text.split(' ')
  const lines = []

  // Split the text into lines based on the number of words per line
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '))
  }

  return lines
}

function splitText(el, maxWordsPerLine = 3) {
  const svg = d3.select(el)

  svg.selectAll('.radar-el-label text').each(function () {
    const text = d3.select(this)
    const originalText = getLabelTextFromNode(this)

    const lines = splitTextIntoLines(originalText, maxWordsPerLine)

    text.text('')
    lines.forEach((line, index) => {
      text
        .append('tspan')
        .text(line)
        .attr('x', 0)
        .attr('dy', index === 0 ? '0em' : '1.1em')
    })
  })
}

export function Radar({ name, data = [], onChange }) {
  if (!data?.length) {
    return null
  }

  const points = data.map((d) => ({ name, ...d }))

  const longitude = d3
    .scalePoint(new Set(Plot.valueof(points, 'key')), [180, -180])
    .padding(0.5)
    .align(1)

  const ref = useRef()
  const [open, setOpen] = useState(false)

  const labelRef = useRef()

  useLayoutEffect(() => {
    if (!ref?.current) {
      return
    }

    splitText(ref.current)
  }, [ref])

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    const glabel = ref?.current.querySelector('.radar-el-label')

    const handleLabelClick = (e) => {
      let element = e.target
      const nodeName = e.target.nodeName

      if (nodeName === 'tspan') {
        element = element.parentNode
      }

      labelRef.current = getLabelTextFromNode(element)

      setOpen(true)
    }

    glabel.addEventListener('click', handleLabelClick)

    return () => {
      glabel.removeEventListener('click', handleLabelClick)
    }
  }, [ref, setOpen])

  return (
    <Box ref={ref}>
      <Dialog
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        title='Evaluer votre niveau de maitrise'
        content={
          <LikertScale
            competence={name}
            label={labelRef.current}
            data={points.find((d) => d.key === labelRef.current)}
            onChange={onChange}
          />
        }
      />

      <PlotFigure
        options={{
          width: 730,
          projection: {
            type: 'azimuthal-equidistant',
            rotate: [0, -90],
            // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
            domain: d3.geoCircle().center([0, 90]).radius(1)(),
          },
          color: { legend: false },
          marks: [
            // grey discs
            Plot.geo([0.5, 0.4, 0.3, 0.2, 0.1], {
              geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
              stroke: 'black',
              fill: 'black',
              strokeOpacity: 0.3,
              fillOpacity: 0.03,
              strokeWidth: 0.5,
            }),

            // white axes
            Plot.link(longitude.domain(), {
              x1: longitude,
              y1: 90 - 0.57,
              x2: 0,
              y2: 90,
              stroke: 'white',
              strokeOpacity: 0.5,
              strokeWidth: 2.5,
            }),

            // tick labels
            Plot.text([0.1, 0.2, 0.3, 0.4, 0.5], {
              x: 180,
              y: (d) => 90 - d,
              dx: 2,
              textAnchor: 'start',
              text: (d) => `${10 * d}`,
              fill: 'currentColor',
              stroke: 'white',
              fontSize: 8,
            }),

            // axes labels
            Plot.text(longitude.domain(), {
              x: longitude,
              y: (_, i) => calculateYPosition(i, points.length),
              text: Plot.identity,
              lineWidth: 5,
              className: 'radar-el-label',
            }),

            // areas
            Plot.area(points, {
              x1: ({ key }) => longitude(key),
              y1: ({ value }) => 90 - value,
              x2: 0,
              y2: 90,
              fill: 'name',
              stroke: 'name',
              curve: 'cardinal-closed',
            }),

            // points
            Plot.dot(points, {
              x: ({ key }) => longitude(key),
              y: ({ value }) => 90 - value,
              fill: 'name',
              stroke: 'white',
            }),
            ,
          ],
        }}
      />
    </Box>
  )
}
