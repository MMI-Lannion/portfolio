import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Flex, Text } from "@radix-ui/themes";
import * as d3 from "d3";
import { useEffect, useLayoutEffect, useState } from "react";
import { $saeData } from "@/store/Store";
import { useStore } from "@nanostores/react";
import { AddWordsToTreeMap } from "./AddWordsToTreeMap";
import { Dialog } from "./Dialog";

export function TreeMap() {
  const data = useStore($saeData)?.competences;

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

  const treemapData = createTreemapData({
    children: data?.filter((d) => d.percentage > 0),
  });

  //ouverture des popup
  const [openPourcentage, setOpenPourcentage] = useState(false);
  const [openKeyword, setOpenKeyword] = useState(false);

  //clic sur un rectangle
  useLayoutEffect(() => {
    const gtext = document.querySelector(".treemap-text-label");
    const grect = document.querySelector(".treemap-rect-label");

    const handleLabelClick = (e) => {
      let element = e.target;
      const nodeName = e.target.nodeName;

      if (nodeName === "tspan") {
        element = element.parentNode;
      }

      let label = "";
      if (element.hasChildNodes()) {
        const child = element.childNodes[0];

        label = child.textContent;
      }
      label = label?.split(":")?.[0]?.trim();
      console.log("label", label);

      setOpenKeyword(true);

      // const clickedBlock = treemapData.find(
      //   (block) => block.data.key === label.trim()
      // );

      // if (clickedBlock) {
      //   setSelectedData(clickedBlock.data); // Stocker les données dans l'état
      //   setOpenKeyword(true); // Ouvrir la dialog
      // }
      // Récupérer les données du bloc correspondant au label cliqué
    };

    gtext?.addEventListener("click", handleLabelClick);
    grect?.addEventListener("click", handleLabelClick);

    return () => {
      gtext?.removeEventListener("click", handleLabelClick);
      grect?.removeEventListener("click", handleLabelClick);
    };
  }, []);

  return (
    <>
      <Flex gap="5" direction="column">
        <Flex direction="row" justify="between">
          <Flex direction="column" gap="2">
            <Text size="4">
              Saisir les mots clés pour définir chaque compétence
            </Text>
            {/* Tooltip : Plus vous renseignez de mots clés pour définir une compétence, plus la compétence est conséquente visuellement. Le treemap fait référence aux 5 compétences du BUT d'après le PN: Comprendre/Concevoir/Exprimer/Développer/Entreprendre*/}
          </Flex>
          <Flex gap="3" align="center">
            {/* <Dialog
              open={openPourcentage}
              onCancel={() => {
                setOpenPourcentage(false);
              }}
              title="Choix du pourcentage"
              content={<AddWordsToTreeMap data={data} />}
            >
              <Button size="4" onClick={() => setOpenPourcentage(true)}>
                <MixerHorizontalIcon />
              </Button>
            </Dialog> */}

            {/* popup mots cles */}
            <Dialog
              open={openKeyword}
              onCancel={() => {
                setOpenKeyword(false);
              }}
              title="Ajouter vos mots clés aux compétences"
              content={<AddWordsToTreeMap data={data} />}
            ></Dialog>
          </Flex>
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
                      return "#b20000";
                    case "Concevoir":
                      return "#ed7d31";
                    case "Exprimer":
                      return "#ffc000";
                    case "Développer":
                      return "#a9d08e";
                    case "Entreprendre":
                      return "#2f75b5";
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
                className: "treemap-text-label",
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
