import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure.js";

const penguins = [
  {
    "species": "Adelie",
    "island": "Torgersen",
    "culmen_length_mm": 39.1,
    "culmen_depth_mm": 18.7,
    "flipper_length_mm": 181,
    "body_mass_g": 3750,
    "sex": "MALE"
  },
  {
    "species": "Adelie",
    "island": "Torgersen",
    "culmen_length_mm": 39.5,
    "culmen_depth_mm": 17.4,
    "flipper_length_mm": 186,
    "body_mass_g": 3800,
    "sex": "FEMALE"
  }
];

export default function Radar() {

  return (
    <>
      <h1>Plot + React</h1>
      <h2>Penguins scatterplot</h2>
      <PlotFigure
        options={{
          marks: [
            Plot.dot(penguins, { x: "culmen_length_mm", y: "culmen_depth_mm" })
          ]
        }}
      />
    </>
  );
}
