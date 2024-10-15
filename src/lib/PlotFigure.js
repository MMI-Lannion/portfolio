import * as Plot from "@observablehq/plot";
// import { createElement as h } from "react";

export default function PlotFigure({ options }) {
  return Plot.plot({ ...options, document: new Document() }).toHyperScript();
}
