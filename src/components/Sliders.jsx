import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Flex, Heading, Text, Box } from "@radix-ui/themes";
import "./tree-map.css";

export function Sliders({ data, setData }) {
  const changeValueSlider = (key, value) => {
    setData((prevData) => {
      console.log(prevData);
      return {
        children: prevData.children.map((e) => {
          if (e.key === key) {
            return { ...e, percentage: value };
          } else {
            return e;
          }
        }),
      };
    });
  };

  let total = data.children.reduce((acc, e) => {
    console.log(acc);
    return acc + Number(e.percentage);
  }, 0);

  // Changement du pourcentage
  //   const changePercentage = (key, value) => {
  //     setData((prevData) => {
  //       const newValue = value[0];
  //       const currentCategory = prevData.children.find((e) => e.key === key);
  //       const currentPercentage = currentCategory.percentage;

  //       const difference = newValue - currentPercentage;

  //       const maxCategory = prevData.children
  //         .filter((e) => e.key !== key)
  //         .reduce(
  //           (max, e) => (e.percentage > max.percentage ? e : max),
  //           prevData.children[0]
  //         );

  //       const newMaxPercentage = Math.max(0, maxCategory.percentage - difference);

  //       return {
  //         children: prevData.children.map((e) => {
  //           if (e.key === key) {
  //             return { ...e, percentage: newValue };
  //           } else if (e.key === maxCategory.key) {
  //             return { ...e, percentage: newMaxPercentage };
  //           }
  //           return e;
  //         }),
  //       };
  //     });
  //   };

  return (
    <>
      <Heading>Choix du pourcentage</Heading>
      <Flex direction="row" gap="9">
        <Flex gap="4" direction="column">
          {data.children.map((e) => {
            return (
              <Text>
                {e.key} : {e.percentage}%
              </Text>
            );
          })}
          <Text color={total === 100 ? "black" : "red"} size="6">
            Total : {total}%
          </Text>
        </Flex>

        <Flex gap="4" direction="column">
          {/* Affichage des sliders */}
          {data.children.map((e) => {
            return (
              <Slider.Root
                className="SliderRoot"
                value={[e.percentage]}
                max={100}
                step={5}
                onValueChange={(value) => changeValueSlider(e.key, value)}
              >
                <Slider.Track className="SliderTrack">
                  <Slider.Range
                    className="SliderRange"
                    style={{ backgroundColor: e.color }}
                  />
                </Slider.Track>
                <Slider.Thumb className="SliderThumb" aria-label="Volume" />
              </Slider.Root>
            );
          })}
        </Flex>
      </Flex>
      <Text color="red">
        {total === 100 ? "" : "Attention : le total doit être de 100% !"}
      </Text>

      {/* <Slider.Root
        className="SliderRoot"
        value={[
          data.children.find((child) => child.key === "Comprendre").percentage,
        ]}
        max={100}
        step={5}
        onValueChange={(value) => changeValueSlider("Comprendre", value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range
            className="SliderRange"
            style={{ backgroundColor: "red" }}
          />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root>

      <Slider.Root
        className="SliderRoot"
        value={[
          data.children.find((child) => child.key === "Concevoir").percentage,
        ]}
        max={100}
        step={5}
        onValueChange={(value) => changeValueSlider("Concevoir", value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range
            className="SliderRange"
            style={{ backgroundColor: "orange" }}
          />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root>

      <Slider.Root
        className="SliderRoot"
        value={[
          data.children.find((child) => child.key === "Produire").percentage,
        ]}
        max={100}
        step={5}
        onValueChange={(value) => changeValueSlider("Produire", value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range
            className="SliderRange"
            style={{ backgroundColor: "yellow" }}
          />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root>

      <Slider.Root
        className="SliderRoot"
        value={[
          data.children.find((child) => child.key === "Développer").percentage,
        ]}
        max={100}
        step={5}
        onValueChange={(value) => changeValueSlider("Développer", value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range
            className="SliderRange"
            style={{ backgroundColor: "green" }}
          />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root>

      <Slider.Root
        className="SliderRoot"
        value={[
          data.children.find((child) => child.key === "Entreprendre")
            .percentage,
        ]}
        max={100}
        step={5}
        onValueChange={(value) => changeValueSlider("Entreprendre", value)}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range
            className="SliderRange"
            style={{ backgroundColor: "blue" }}
          />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      </Slider.Root> */}
    </>
  );
}
