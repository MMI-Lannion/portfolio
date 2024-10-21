import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import "./tree-map.css";
import { Sliders } from "./Sliders";
import { Dialog } from "./Dialog";
import { MixerHorizontalIcon, SliderIcon } from "@radix-ui/react-icons";

// Données pour le treemap

export function TreeMap() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    children: [
      {
        key: "Comprendre",
        color: "red",
        percentage: 10,
        keywords: ["key word 1", "key word 2"],
      },
      { key: "Concevoir", color: "orange", percentage: 10, keywords: ["er"] },
      { key: "Produire", color: "yellow", percentage: 10, keywords: [] },
      { key: "Développer", color: "green", percentage: 60, keywords: [] },
      { key: "Entreprendre", color: "blue", percentage: 10, keywords: [] },
    ],
  });

  //Pourcentage en fonction du nombre de bloc de compétence
  useEffect(() => {
    const totalSkills = data.children.length;
    const newPercentage = 100 / totalSkills;

    setData((prevData) => ({
      children: prevData.children.map((e) => ({
        ...e,
        percentage: newPercentage % 5 === 0 ? newPercentage : 30,
      })),
    }));
  }, []);

  // Configuration du layout du treemap
  const createTreemapData = (data) => {
    const root = d3.hierarchy(data).sum((d) => d.percentage);

    // Génération des coordonnées pour chaque noeud
    const treemapLayout = d3.treemap().size([1500, 1000]).padding(5);
    const leaves = treemapLayout(root).leaves();

    // Mettez à jour les données avec les coordonnées
    leaves.forEach((leaf) => {
      const { data } = leaf;
      data.x0 = leaf.x0;
      data.y0 = leaf.y0;
      data.x1 = leaf.x1;
      data.y1 = leaf.y1;
    });

    return leaves;
  };

  const treemapData = createTreemapData(data);

  return (
    <>
      <Flex gap="5" direction="column">
        <Flex gap="3" justify="end" align="center">
          <Text size="8">XX (%)</Text>
          <Dialog
            open={open}
            onCancel={() => {
              setOpen(false);
            }}
            title="Evaluer Vos Compotences"
            content={<Sliders key="" data={data} setData={setData} />}
          >
            <Button size="4" onClick={() => setOpen(true)}>
              <MixerHorizontalIcon />
            </Button>
          </Dialog>
        </Flex>

        <PlotFigure
          options={{
            width: 1500,
            height: 500,
            color: { legend: true },
            axis: null,
            marks: [
              // Rectangles pour le treemap
              Plot.rect(treemapData, {
                x1: "x0",
                x2: "x1",
                y1: "y0",
                y2: "y1",
                fill: (d) => {
                  switch (d.data.key) {
                    case "Comprendre":
                      return "red";
                    case "Concevoir":
                      return "orange";
                    case "Produire":
                      return "yellow";
                    case "Développer":
                      return "green";
                    case "Entreprendre":
                      return "blue";
                    default:
                      return "grey";
                  }
                },
                title: (d) => `${d.data.key} : ${d.data.percentage}%`,
              }),
              // Labels pour chaque section du treemap
              Plot.text(treemapData, {
                x: (d) => (d.x0 + d.x1) / 2,
                y: (d) => (d.y0 + d.y1) / 2,
                dx: 0,
                dy: 0,
                text: (d) => {
                  const percentage = d.data.percentage;
                  const key = d.data.key;
                  const keywords = d.data.keywords;
                  return `${key} :\t${parseInt(
                    percentage
                  )}%\n\nMots-clés : ${keywords}`;
                },
                fill: "#fff",
                textAnchor: "middle",
                fontSize: 20,
              }),
            ],
          }}
        />
      </Flex>
    </>
  );
}
