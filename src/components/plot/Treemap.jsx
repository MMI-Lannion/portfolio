import React, { useEffect } from "react";
import * as Plot from "@observablehq/plot";

const TreeMap = () => {
  useEffect(() => {
    // Options de la Tree Map
    const data = [
      { label: "A", size: 15 },
      { label: "B", size: 30 },
      { label: "C", size: 45 },
      { label: "D", size: 10 },
      { label: "E", size: 25 },
    ];

    // Créer la Tree Map
    const svg = Plot.plot({
      marks: [
        Plot.treemap(data, {
          label: d => d.label,
          size: d => d.size,
          fill: d => {
            const colors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"];
            return colors[data.indexOf(d) % colors.length]; // Appliquer les couleurs
          },
        }),
      ],
    });

    // Ajouter le graphique au conteneur
    const container = document.getElementById("tree-map-container");

    console.log(container); // Vérifiez si le conteneur est trouvé

    if (container) {
      container.innerHTML = ''; // Effacer le contenu précédent
      container.appendChild(svg); // Ajouter le graphique
    } else {
      console.error("Container not found!"); // Message d'erreur si le conteneur est introuvable
    }

    // Cleanup: Effacer le contenu lors du démontage
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div id="tree-map-container" style={{ width: "100%", height: "400px", border: "1px solid red" }}>
      Bonjour
    </div>
  );
};

export default TreeMap;
