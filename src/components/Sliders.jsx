import * as Slider from "@radix-ui/react-slider";
import { Flex, Text } from "@radix-ui/themes";
// import "./tree-map.css";
import { useStore } from "@nanostores/react";
import { $changeValueSlider, $totalPourcentage, $saeData } from "@/store/Store";
import React from "react";

export function Sliders() {
  //données store
  const data = useStore($saeData).competences;

  //total pour vérifier si 100%
  let total = $totalPourcentage();

  // changement pourcentage automatique
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
      <Flex direction="row" gap="9">
        <Flex gap="4" direction="column">
          {data.map((e) => {
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
          {data.map((e) => {
            return (
              <Slider.Root
                className="SliderRoot"
                value={[e.percentage]}
                max={100}
                step={5}
                onValueChange={(value) => $changeValueSlider(e.key, value)}
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
    </>
  );
}
