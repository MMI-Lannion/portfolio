import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import React from "react";

// Données pour le treemap
const data = {
  name: "root",
  children: [
    { name: "Comprendre", percentage: 10 },
    { name: "Concevoir", percentage: 10 },
    { name: "Créer", percentage: 10 },
    { name: "Développer", percentage: 60 },
    { name: "Entreprendre", percentage: 10 }
  ]
};

// Configuration du layout du treemap
const createTreemapData = (data) => {
  const root = d3
    .hierarchy(data)
    .sum((d) => d.percentage) // Utilisation du pourcentage comme valeur
    .sort((a, b) => b.percentage - a.percentage);

  // Génération des coordonnées pour chaque noeud
  const treemapLayout = d3.treemap().size([1500, 1000]).padding(5);
  const leaves = treemapLayout(root).leaves();

  // Mettez à jour les données avec les coordonnées
  leaves.forEach((leaf) => {
    const { data } = leaf; // On récupère les données de chaque feuille
    data.x0 = leaf.x0; // Mise à jour des coordonnées
    data.y0 = leaf.y0;
    data.x1 = leaf.x1;
    data.y1 = leaf.y1;
  });

  return leaves; // Retourne les feuilles mises à jour
};

const treemapData = createTreemapData(data);

export function TreeMap() {
  return (
    <PlotFigure
      options={{
        width: 1500,
        height: 500,
        color: { legend: true },
        axis: null, // Supprimer les axes
        marks: [
          // Rectangles pour le treemap
          Plot.rect(treemapData, {
            x1: "x0", // Position initiale x
            x2: "x1", // Position finale x
            y1: "y0", // Position initiale y
            y2: "y1", // Position finale y
            fill: (d) => {
              switch (d.data.name) {
                case "Comprendre": return "red";
                case "Concevoir": return "green";
                case "Créer": return "yellow";
                case "Développer": return "orange";
                case "Entreprendre": return "blue";
                default: return "grey";
              }
            },
            title: (d) => `${d.data.name}: ${d.data.percentage}%`, // Titre pour chaque rectangle
          }),
          // Labels pour chaque section du treemap
          Plot.text(treemapData, {
            x: (d) => (d.x0 + d.x1) / 2, // Centre du rectangle pour le texte
            y: (d) => (d.y0 + d.y1) / 2, // Centre du rectangle pour le texte
            dx: 0,
            dy: 0,
            text: (d) => {
              const percentage = d.data.percentage;
              return percentage > 5 ? `${percentage}%` : ""; // Affiche le pourcentage si supérieur à 5%
            },
            fill: "#fff", // Couleur du texte
            textAnchor: "middle",
          }),
        ],
      }}
    />
  );
}
