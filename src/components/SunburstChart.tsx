import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "./flare-2.json";

const SIZE = 975;
const RADIUS = SIZE / 2;

interface Data {
  name: string;
  value?: number;
}

export const SunburstChart = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = React.useState("0 -700 300 1300");

  // const color = d3.scaleOrdinal(
  //   d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  // );

  // const hierarchy = d3.hierarchy(data)
  //     .sum(d => d.value)
  //     .sort((a, b) => b.value - a.value);
  // const root = d3.partition()
  //     .size([2 * Math.PI, hierarchy.height + 1])
  //   (hierarchy);
  // root.each(d => d.current = d);

  // // const partition = (data: Data) =>
  // //   d3.partition<Data>().size([2 * Math.PI, RADIUS])(
  // //     d3
  // //       .hierarchy(data)
  // //       .sum((d) => d.value)
  // //       .sort((a, b) => b.value - a.value)
  // //   );

  // // Create the arc generator.
  // const arc = d3.arc()
  //     .startAngle(d => d.x0)
  //     .endAngle(d => d.x1)
  //     .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
  //     .padRadius(RADIUS * 1.5)
  //     .innerRadius(d => d.y0 * RADIUS)
  //     .outerRadius(d => Math.max(d.y0 * RADIUS, d.y1 * RADIUS - 1))


  

  // const format = d3.format(",d");

  // const getAutoBox = () => {
  //   if (!svgRef.current) {
  //     return "";
  //   }

  //   const { x, y, width, height } = svgRef.current.getBBox();
  //   return [x, y, width, height].toString();
  // };

  // React.useEffect(() => {
  //   setViewBox(getAutoBox());
  // }, []);

  // const getColor = (d: d3.HierarchyRectangularNode<Data>) => {
  //   while (d.depth > 1) d = d.parent;
  //   return color(d.data.name);
  // };

  // const getTextTransform = (d: d3.HierarchyRectangularNode<Data>) => {
  //   const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
  //   const y = (d.y0 + d.y1) / 2;
  //   return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  // };

  // // const root = partition(data);
  
  // // Fonction pour le zoom
  // const handleClick = (event: React.MouseEvent<SVGPathElement>, p: d3.HierarchyRectangularNode<Data>) => {
  //   const svg = d3.select(svgRef.current);
  //   const g = svg.select("g");

  //   // Transition vers le nouveau focus
  //   const transition = svg
  //     .transition()
  //     .duration(750)
  //     .tween("scale", () => {
  //       const xd = d3.interpolate(root.x0, root.x1);
  //       const yd = d3.interpolate(root.y0, root.y1);
  //       return (t) => {
  //         root.x0 = xd(t);
  //         root.y0 = yd(t);
  //       };
  //     });

  //   // Mise à jour du chemin avec la transition
  //   g.selectAll("path")
  //     .transition(transition)
  //     .attrTween("d", (d) => () => arc(d as d3.HierarchyRectangularNode<Data>));

  //   // Mise à jour du texte
  //   g.selectAll("text")
  //     .transition(transition)
  //     .attrTween("transform", (d) => () => getTextTransform(d as d3.HierarchyRectangularNode<Data>));
  // };

  // const newData = root
  // .descendants()
  // .slice(1)

  // console.log('newData', newData, root.descendants())
  // ;

  useEffect(() => {
    if(!svgRef.current) { return; }

    // Specify the chart’s dimensions.
  const width = SIZE;
  const height = SIZE;
  const radius = width / 6;

  // Create the color scale.
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

  // Compute the layout.
  const hierarchy = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
  const root = d3.partition()
      .size([2 * Math.PI, hierarchy.height + 1])
    (hierarchy);
  root.each(d => d.current = d);

  // modifier le style des titres 


  // Create the arc generator.
  const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

  // Create the SVG container.
  // const svg = d3.create("svg")
  //     .attr("viewBox", [-width / 2, -height / 2, width, width])
  //     .style("font", "10px sans-serif");

  const svg  = d3.select(svgRef.current);

  // Append the arcs.
  const path = svg.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

      .attr("d", d => arc(d.current));

  // Make them clickable if they have children.
  path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

  const format = d3.format(",d");
  path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  const label = svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

// Ajouter un élément div pour le tooltip dans le corps du document
const tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("position", "absolute")
.style("visibility", "hidden")
.style("background", "#fff")
.style("border", "1px solid #ccc")
.style("padding", "5px")
.style("border-radius", "3px")
.style("box-shadow", "0 0 5px rgba(0,0,0,0.3)");

// Ajouter des événements mouseover et mouseout aux éléments path
path.on("mouseover", function(event, d) {
  tooltip.style("visibility", "visible")
    .text(d.data.description); // Assurez-vous que chaque élément de données a une propriété 'description'
})
.on("mousemove", function(event) {
  tooltip.style("top", (event.pageY - 10) + "px")
    .style("left", (event.pageX + 10) + "px");
})
.on("mouseout", function() {
  tooltip.style("visibility", "hidden");
});

  const parent = svg.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

  // Handle zoom on click.
  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = svg.transition().duration(750);

  console.log('root', root.descendants())

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 

        .attrTween("d", d => () => arc(d.current));

    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }
  
  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }
  }, [svgRef])
  

  return (
    <svg width={SIZE} height={SIZE} viewBox={viewBox} ref={svgRef}>
      {/* <g fillOpacity={0.6}>
        {newData
          .filter((d) => d.depth)
          .map((d, i) => (
            <path
              key={`${d.data.name}-${i}`}
              fill={getColor(d)}
              d={arc(d)}
              onClick={(event) => handleClick(event, d)} // Ajout de l'événement de clic
            >
              <text>{d
                  .ancestors()
                  .map((d) => d.data.name)
                  .reverse()
                  .join("/")}
                \n${format(d.value)}
              </text>
            </path>
          ))}
      </g>
      <g
        pointerEvents="none"
        textAnchor="middle"
        fontSize={10}
        fontFamily="sans-serif"
      >
        {newData
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
          .map((d, i) => (
            <text
              key={`${d.data.name}-${i}`}
              transform={getTextTransform(d)}
              dy="0.35em"
            >
             dd {d.data.name}
            </text>
          ))}
      </g> */}
    </svg>
  );
};