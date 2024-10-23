import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Button, Flex, Text } from "@radix-ui/themes";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";
// import "./tree-map.css";
import { Sliders } from "./Sliders";
import { AddWordsToTreeMap } from "./AddWordsToTreeMap";
import { Dialog } from "./Dialog";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useStore } from "@nanostores/react";
import {
  $treemap,
  $setInitialPourcentage,
  $totalPourcentage,
} from "@/store/Store";

export function TreeMap() {
  //données store
  const data = useStore($treemap);
  //total pour vérifier si 100%
  let total = $totalPourcentage();

  //pourcentage en fonction du nombre de blocs de compétences
  useEffect(() => {
    $setInitialPourcentage();
  }, []);

  // configuration du layout du treemap
  const createTreemapData = (data) => {
    const root = d3.hierarchy(data).sum((d) => d.percentage);

    const treemapLayout = d3.treemap().size([1500, 1000]).padding(5);
    const leaves = treemapLayout(root).leaves();

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

  //ouverture des popup
  const [openPourcentage, setOpenPourcentage] = useState(false);
  const [openKeyword, setOpenKeyword] = useState(false);

  //clic sur un rectangle
  useEffect(() => {
    const glabel = document.querySelector(".treemap-rect-label");

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

      setOpenKeyword(true);
    };

    glabel.addEventListener("click", handleLabelClick);

    return () => {
      glabel.removeEventListener("click", handleLabelClick);
    };
  }, [setOpenKeyword]);

  return (
    <>
      <Flex gap="5" direction="column">
        <Flex gap="3" justify="end" align="center">
          <Text color={total === 100 ? "black" : "red"} size="6">
            Total : {total}%
          </Text>

          {/* popup pourcentages */}
          <Dialog
            open={openPourcentage}
            onCancel={() => {
              setOpenPourcentage(false);
            }}
            title="Evaluer Vos Compétences"
            content={<AddWordsToTreeMap key="" data={data} />}
          >
            <Button size="4" onClick={() => setOpenPourcentage(true)}>
              <MixerHorizontalIcon />
            </Button>
          </Dialog>

          {/* popup mots cles */}
          <Dialog
            open={openKeyword}
            onCancel={() => {
              setOpenKeyword(false);
            }}
            title="Choix des mots clés"
            content={<AddWordsToTreeMap />}
          ></Dialog>
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
                className: "treemap-rect-label",
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
