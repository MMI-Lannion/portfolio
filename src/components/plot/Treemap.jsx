import React, { useEffect } from "react";
import * as Plot from "@observablehq/plot";

const TreeMap = () => {
  useEffect(() => {
    // Données de la Tree Map
    const data = [
      { label: "A", size: 15 },
      { label: "B", size: 30 },
      { label: "C", size: 45 },
      { label: "D", size: 10 },
      { label: "E", size: 25 },
    ];

    // Couleurs pour chaque bloc
    const colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"];

    // Calcule les positions et dimensions basées sur les tailles
    let x = 0;
    const rects = data.map((d, i) => {
      const width = d.size * 10; // ajustez l'échelle
      const rect = { ...d, x, width, color: colors[i % colors.length] }; // Ajoute la couleur à chaque élément
      x += width;
      return rect;
    });

    // Création de la visualisation
    const svg = Plot.plot({
      width: 500,
      height: 200,
      marks: [
        Plot.rect(rects, {
          x: "x",
          width: "width",
          y: 0,
          height: 100,
          fill: "color", // Utilise la couleur attribuée dans chaque élément
        }),
        Plot.text(rects, {
          x: (d) => d.x + d.width / 2,
          y: 50,
          text: (d) => d.label,
          textAnchor: "middle",
          dy: "0.35em",
        }),
      ],
    });

    const container = document.getElementById("tree-map-container");
    container.innerHTML = ''; // Efface le contenu précédent
    container.appendChild(svg);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      id="tree-map-container"
      style={{ width: "100%", height: "200px", border: "1px solid red" }}
    >
      Bonjour
    </div>
  );
};

export default TreeMap;
