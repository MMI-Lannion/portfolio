import PlotFigure from "@/PlotFigure";
import * as Plot from "@observablehq/plot";
import { Flex, Heading } from "@radix-ui/themes";
import * as Slider from "@radix-ui/react-slider";
import * as Dialog from "@radix-ui/react-dialog";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import "./tree-map.css";
import { Cross2Icon } from "@radix-ui/react-icons";

// Données pour le treemap

export function TreeMap() {
  const [data, setData] = useState({
    children: [
      { name: "Comprendre", percentage: 10 },
      { name: "Concevoir", percentage: 10 },
      { name: "Produire", percentage: 10 },
      { name: "Développer", percentage: 60 },
      { name: "Entreprendre", percentage: 10 },
    ],
  });

  //changement du pourcentage
  const changePercentage = (name, value) => {
    setData((prevData) => {
      const newValue = value[0];
      const currentCategory = prevData.children.find((e) => e.name === name);
      const currentPercentage = currentCategory.percentage;
  
      const difference = newValue - currentPercentage;
  
      const maxCategory = prevData.children
        .filter((e) => e.name !== name)
        .reduce((max, e) => (e.percentage > max.percentage ? e : max), prevData.children[0]);
  
      const newMaxPercentage = Math.max(0, maxCategory.percentage - difference);
  
      return {
        children: prevData.children.map((e) => {
          if (e.name === name) {
            
            return { ...e, percentage: newValue };
          } else if (e.name === maxCategory.name) {
            
            return { ...e, percentage: newMaxPercentage };
          }
          return e;
        }),
      };
    });
  };
  
  

  // Configuration du layout du treemap
  const createTreemapData = (data) => {
    const root = d3
      .hierarchy(data)
      .sum((d) => d.percentage)
      .sort((a, b) => b.percentage - a.percentage);

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

  const handleClick = (event, d) => {
    console.log("test");
  };

  // const ref = useRef();

  // useEffect(() => {
  //   if (!ref?.current) {
  //     return
  //   }

  //   console.log("test");

  //   const glabel = ref?.current.querySelector(".");
  //   const handleClick = (e) => {

  //   }
  // })

  return (
    <>
      <Flex gap="5" direction="column">
        <Heading>Treemap</Heading>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="Button violet">Edit profile</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">
                Changer le pourcentage
              </Dialog.Title>
              <Dialog.Description className="DialogDescription"></Dialog.Description>
              <fieldset className="Fieldset"></fieldset>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <button className="Button green">Save changes</button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* Slider Comprendre */}
        <Slider.Root
          className="SliderRoot"
          defaultValue={[
            data.children.find((child) => child.name === "Comprendre")
              .percentage,
          ]}
          max={100}
          step={5}
          onValueChange={(value) => changePercentage("Comprendre", value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range
              className="SliderRange"
              style={{ backgroundColor: "red" }}
            />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

        {/* Slider Concevoir */}
        <Slider.Root
          className="SliderRoot"
          defaultValue={[
            data.children.find((child) => child.name === "Concevoir")
              .percentage,
          ]}
          max={100}
          step={5}
          onValueChange={(value) => changePercentage("Concevoir", value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range
              className="SliderRange"
              style={{ backgroundColor: "orange" }}
            />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

        {/* Slider Produire */}
        <Slider.Root
          className="SliderRoot"
          defaultValue={[
            data.children.find((child) => child.name === "Produire").percentage,
          ]}
          max={100}
          step={5}
          onValueChange={(value) => changePercentage("Produire", value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range
              className="SliderRange"
              style={{ backgroundColor: "yellow" }}
            />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

        {/* Slider Développer */}
        <Slider.Root
          className="SliderRoot"
          defaultValue={[
            data.children.find((child) => child.name === "Développer")
              .percentage,
          ]}
          max={100}
          step={5}
          onValueChange={(value) => changePercentage("Développer", value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range
              className="SliderRange"
              style={{ backgroundColor: "green" }}
            />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

        {/* Slider Entreprendre */}
        <Slider.Root
          className="SliderRoot"
          defaultValue={[
            data.children.find((child) => child.name === "Entreprendre")
              .percentage,
          ]}
          max={100}
          step={5}
          onValueChange={(value) => changePercentage("Entreprendre", value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range
              className="SliderRange"
              style={{ backgroundColor: "blue" }}
            />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>

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
                  switch (d.data.name) {
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
                title: (d) => `${d.data.name} : ${d.data.percentage}%`,
                onClick: handleClick,
              }),
              // Labels pour chaque section du treemap
              Plot.text(treemapData, {
                x: (d) => (d.x0 + d.x1) / 2,
                y: (d) => (d.y0 + d.y1) / 2,
                dx: 0,
                dy: 0,
                text: (d) => {
                  const percentage = d.data.percentage;
                  const name = d.data.name;
                  return `${name}\n\n${percentage}%`;
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
