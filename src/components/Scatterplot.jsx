import PlotFigure from '@/lib/PlotFigure'
import penguins from './data.json'
import * as Plot from '@observablehq/plot'

export function Scatterplot() {
  return (
    <PlotFigure
      options={{
        marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' })],
      }}
    />
  )
}
