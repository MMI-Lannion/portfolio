import { Sunburst } from '@/lib/sunburst'
import { $updateSoftskills } from '@/store/Store'
import { useEffect, useRef } from 'react'

export function SunburstChart({ treeData, selected }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!svgRef?.current) {
      return
    }

    function onSelect(d) {
      // last level is selectable
      if (d.depth === 3) {
        console.log('selected ee', d)
        $updateSoftskills({ label: d.data.name })
      }
    }

    Sunburst(svgRef.current, treeData, {
      onSelect,
      selected,
      label: (d) => d.name,
      title: (d) => d.description,
      width: 730,
      height: 730,
      selectedFill: 'var(--accent-9)',
    })
  }, [svgRef, treeData, selected])

  return <svg ref={svgRef}></svg>
}
