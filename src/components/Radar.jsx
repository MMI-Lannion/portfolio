import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

import phones from "./phones.json";
import { Box } from "@radix-ui/themes";
import { Dialog } from "./Dialog";

const points = phones.flatMap(({ name, ...values }) =>
  Object.entries(values).map(([key, value]) => ({ name, key, value }))
);

export function Radar({ datas }) {
  const points = datas.flatMap(({ name, ...values }) =>
    Object.entries(values).map(([key, value]) => ({ name, key, value }))
  );

  const longitude = d3
    .scalePoint(new Set(Plot.valueof(points, "key")), [180, -180])
    .padding(0.5)
    .align(1);

  const ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const glabel = ref?.current.querySelector(".radar-el-label");

    const handleLabelClick = (e) => {
      let element = e.target;
      const nodeName = e.target.nodeName;

      if (nodeName === "tspan") {
        element = element.parentNode;
      }

      let label = "";
      if (element.hasChildNodes()) {
        let children = element.childNodes;

        for (const node of children) {
          label += " " + node.textContent;
        }
      } else {
        label = element.textContent;
      }

      console.log("handleLabelClick", label);
      setOpen(true);
    };

    glabel.addEventListener("click", handleLabelClick);

    return () => {
      glabel.removeEventListener("click", handleLabelClick);
    };
  }, [ref, setOpen]);

  return (
    <Box ref={ref}>
      <Dialog
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        title="Dialog title"
        content={<Box>Likert Scale</Box>}
      />

      <PlotFigure
        options={{
          width: 450,
          projection: {
            type: "azimuthal-equidistant",
            rotate: [0, -90],
            // Note: 0.625° corresponds to max. length (here, 0.5), plus enough room for the labels
            domain: d3.geoCircle().center([0, 90]).radius(0.625)(),
          },
          color: { legend: true },
          marks: [
            // grey discs
            Plot.geo([0.5, 0.4, 0.3, 0.2, 0.1], {
              geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
              stroke: "black",
              fill: "black",
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
              stroke: "white",
              strokeOpacity: 0.5,
              strokeWidth: 2.5,
            }),

            // tick labels
            Plot.text([0.1, 0.2, 0.3, 0.4, 0.5], {
              x: 180,
              y: (d) => 90 - d,
              dx: 2,
              textAnchor: "start",
              text: (d) => `${100 * d}%`,
              fill: "currentColor",
              stroke: "white",
              fontSize: 8,
            }),

            // axes labels
            Plot.text(longitude.domain(), {
              x: longitude,
              y: 90 - 0.57,
              text: Plot.identity,
              lineWidth: 5,
              className: "radar-el-label",
            }),

            // areas
            Plot.area(points, {
              x1: ({ key }) => longitude(key),
              y1: ({ value }) => 90 - value,
              x2: 0,
              y2: 90,
              fill: "name",
              stroke: "name",
              curve: "cardinal-closed",
            }),

            // points
            Plot.dot(points, {
              x: ({ key }) => longitude(key),
              y: ({ value }) => 90 - value,
              fill: "name",
              stroke: "white",
            }),

            // interactive labels
            Plot.text(
              points,
              Plot.pointer({
                x: ({ key }) => longitude(key),
                y: ({ value }) => 90 - value,
                text: (d) => `${(100 * d.value).toFixed(0)}%`,
                textAnchor: "start",
                dx: 4,
                fill: "currentColor",
                stroke: "white",
                maxRadius: 10,
              })
            ),

            // interactive opacity on the areas
            //       () =>
            //         svg`<style>
            //       g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
            //       g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
            //       g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
            //   `

            ,
          ],
        }}
      />
    </Box>
  );
}
