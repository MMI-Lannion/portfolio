import React from "react";
import { Flex, Box, Radio, Text } from "@radix-ui/themes";
import "../assets/styles/action-plan.css";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import InfoCircled from "./InfoCircled";
import { $saeData, $setSaeData, $updateAxeAmelioration } from "@/store/Store";
import { useStore } from "@nanostores/react";

const titles = [
  "Peu de connaissance / Mise en pratique forte",
  "Excellente connaissance / Mise en application forte",
  "Peu de connaissance / Peu de mise en pratique",
  "Excellente connaissance / Peu de mise en application",
];

const colors = ["yellow", "purple", "teal", "grey"];

function TableActionPlan() {
  const defaultValue = useStore($saeData)?.axeAmelioration;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "auto 1fr",
          gap: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            textAlign: "center",
            textOrientation: "mixed",
            writingMode: "vertical-lr",
            width: "fit-content",
          }}
        >
          <span style={{ transform: "rotate(180deg)" }}>Savoir faire</span>
          <InfoCircled text="Ce que je mets en application" />
        </div>
        <div>
          <Flex direction="column" gap="2">
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "10px",
                borderLeft: "2px solid black",
                borderBottom: "2px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {[
                "Appliquer le savoir",
                "Se perfectionner",
                "Retravailler les bases",
                "Oser",
              ].map((label, index) => {
                return (
                  <Flex
                    key={label}
                    direction="column"
                    justify="center"
                    className={`flex-item ${colors[index]}`}
                    onClick={$updateAxeAmelioration.bind(null, label)}
                  >
                    <InfoCircled text={titles[index]} />
                    <Text weight="medium" size="4" className="flex-item-span">
                      {label}
                    </Text>
                    <Radio
                      className="flex-item-checkbox"
                      name="example"
                      value={label}
                      defaultChecked={label === defaultValue}
                    />
                  </Flex>
                );
              })}
            </Box>
          </Flex>
        </div>
        <div id="empty"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
            gap: "5px",
            textAlign: "center",
          }}
        >
          <span>Savoir</span>
          <InfoCircled text="Ce que je connais" />
        </div>
      </div>
    </>
  );
}

export default TableActionPlan;
