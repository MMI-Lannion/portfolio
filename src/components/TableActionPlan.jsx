import React from "react";
import { Flex, Box, Checkbox } from "@radix-ui/themes";
import "../assets/styles/action-plan.css";

function TableActionPlan({ onChange }) {
  const handleClick = (message) => {
    console.log(message);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20% 80%",
          gridTemplateRows: "auto 1fr",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Savoir faire</span>
          <p style={{ margin: 0 }}>Ce que je mets en application</p>
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
              }}
            >
              <Flex
                direction="column"
                justify="center"
                className="flex-item yellow"
                onClick={() => handleClick("Appliquer le savoir")}
              >
                <p className="flex-item-text">
                  Peu de connaissance / Mise en pratique forte
                </p>
                <span className="flex-item-span">Appliquer le savoir</span>
                <Checkbox className="flex-item-checkbox" />
              </Flex>
              <Flex
                direction="column"
                justify="center"
                className="flex-item purple"
                onClick={() => handleClick("Se perfectionner")}
              >
                <p className="flex-item-text">
                  Excellente connaissance / Mise en application forte
                </p>
                <span className="flex-item-span">Se perfectionner</span>
                <Checkbox className="flex-item-checkbox" />
              </Flex>
              <Flex
                direction="column"
                justify="center"
                className="flex-item teal"
                onClick={() => handleClick("Retravailler les bases")}
              >
                <p className="flex-item-text">
                  Peu de connaissance / Peu de mise en pratique
                </p>
                <span className="flex-item-span">Retravailler les bases</span>
                <Checkbox className="flex-item-checkbox" />
              </Flex>
              <Flex
                direction="column"
                justify="center"
                className="flex-item grey"
                onClick={() => handleClick("Oser")}
              >
                <p className="flex-item-text">
                  Excellente connaissance / Peu de mise en application
                </p>
                <span className="flex-item-span">Oser</span>
                <Checkbox className="flex-item-checkbox" />
              </Flex>
            </Box>
          </Flex>
        </div>
        <div id="empty"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span>Savoir</span>
          <p style={{ margin: 0 }}>Ce que je connais</p>
        </div>
      </div>
    </>
  );
}

export default TableActionPlan;
