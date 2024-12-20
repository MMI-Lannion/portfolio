import * as d3 from 'd3'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'

const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('padding', '8px')
  .style('max-width', '400px')
  .style('max-height', '400px')
  .style('background-color', 'white')
  .style('border', '1px solid #ccc')
  .style('border-radius', '4px')
  .style('box-shadow', '#ccc 0px 10px 38px -10px, #ccc 0px 10px 20px -15px')
  .style('pointer-events', 'none')
  .style('opacity', 0)

export function Sunburst(
  element,
  data,
  {
    onSelect = null,
    selected = [],
    // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    value, // given a node d, returns a quantitative value (for area encoding; null for count)
    sort = (a, b) => d3.descending(a.value, b.value), // how to sort nodes prior to layout
    label, // given a node d, returns the name to display on the rectangle
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = '_blank', // the target attribute for links (if any)
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    margin = 1, // shorthand for margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    padding = 1, // separation between arcs
    startAngle = 0, // the starting angle for the sunburst
    endAngle = 2 * Math.PI, // the ending angle for the sunburst
    radius = Math.min(
      width - marginLeft - marginRight,
      height - marginTop - marginBottom,
    ) / 2, // outer radius
    color = d3.interpolateRainbow, // color scheme, if any
    fill = '#0000', // fill for arcs (if no color encoding)
    selectedFill = 'red', // fill for arcs when selected
    fillOpacity = 0.6, // fill opacity for arcs
  } = {},
) {
  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  const root =
    path != null
      ? d3.stratify().path(path)(data)
      : id != null || parentId != null
        ? d3.stratify().id(id).parentId(parentId)(data)
        : d3.hierarchy(data, children)

  // Compute the values of internal nodes by aggregating from the leaves.
  value == null ? root.count() : root.sum((d) => Math.max(0, value(d)))

  // Sort the leaves (typically by descending value for a pleasing layout).
  if (sort != null) root.sort(sort)

  // Compute the partition layout. Note polar coordinates: x is angle and y is radius.
  d3.partition().size([endAngle - startAngle, radius])(root)

  // Construct a color scale.
  if (color != null) {
    color = d3.scaleSequential([0, root.children.length], color).unknown(fill)
    root.children.forEach((child, i) => (child.index = i))
  }

  const getColor = (d) => {
    const isSelected = selected?.includes(d.data.name)
    return isSelected
      ? selectedFill
      : color
        ? color(d.ancestors().reverse()[1]?.index)
        : fill
  }

  // Construct an arc generator.
  const arc = d3
    .arc()
    .startAngle((d) => d.x0 + startAngle)
    .endAngle((d) => d.x1 + startAngle)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, (2 * padding) / radius))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - padding)

  const svg = d3.select(element)

  svg.selectAll('*').remove()

  svg
    .attr('viewBox', [
      marginRight - marginLeft - width / 2,
      marginBottom - marginTop - height / 2,
      width,
      height,
    ])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 11)
    .attr('text-anchor', 'middle')

  const cell = svg
    .selectAll('a')
    .data(root.descendants())
    .join('a')
    .attr('xlink:href', link == null ? null : (d) => link(d.data, d))
    .attr('target', link == null ? null : linkTarget)

  cell
    .append('path')
    .attr('d', arc)
    .style('cursor', 'pointer')
    .attr('fill', getColor)
    .attr('fill-opacity', fillOpacity)

  if (label != null)
    cell
      .filter((d) => ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
      .append('text')
      .attr('transform', (d) => {
        if (!d.depth) return
        const x = (((d.x0 + d.x1) / 2 + startAngle) * 180) / Math.PI
        const y = (d.y0 + d.y1) / 2
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
      })
      .attr('dy', '0.32em')
      // .text((d) => label(d.data, d))
      .style('cursor', 'pointer')
      .each(function (d) {
        const text = d3.select(this)
        const lines = d.data.name.split(' ')
        lines.forEach((line, i) => {
          text
            .append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? '0em' : '0.8em')
            .text(line)
        })
      })

  cell
    .on('click', function (_, d) {
      onSelect?.({ data: d.data, depth: d.depth })
    })
    .on('mouseenter', function (event, d) {
      let tip = title(d.data, d)
      if (!tip) tip = d.data.name

      tooltip.html(`${tip}`).style('opacity', 1)

      d3.select(this).select('path').attr('fill', 'var(--accent-indicator)')

      // Position the tooltip
      const virtualEl = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
            top: event.clientY,
            left: event.clientX,
            right: event.clientX,
            bottom: event.clientY,
          }
        },
      }

      setTimeout(() => {
        computePosition(virtualEl, tooltip.node(), {
          placement: 'right',
          middleware: [offset(20), flip(), shift({ padding: 110 })],
        }).then(({ x, y }) => {
          tooltip.style('left', `${x}px`).style('top', `${y}px`)
        })
      }, 0)
    })
    .on('mouseleave', function () {
      tooltip.style('opacity', 0)
      d3.select(this).select('path').attr('fill', getColor)
    })
}
