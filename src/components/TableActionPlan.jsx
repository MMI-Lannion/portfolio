import React from "react";
import { Flex, Box, Checkbox } from "@radix-ui/themes";

function TableActionPlan() {
  return (
    <Flex direction="column" gap="2">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",

          borderLeft: "2px solid black",
          borderBottom: "2px solid black",
          padding: "10px",
        }}
      >
        <Flex
          direction="column"
          style={{
            minHeight: "50px",
            backgroundColor: "#FED410",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <p style={{ color: "#fff", margin: 0 }}>
            Peu de connaissance / Mise en pratique forte
          </p>
          <span style={{ color: "#fff", fontSize: "1.5em" }}>
            Appliquer le savoir
          </span>
          <Checkbox />
        </Flex>
        <Flex
          direction="column"
          style={{
            minHeight: "50px",
            backgroundColor: "#971289",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <p style={{ color: "#fff", margin: 0 }}>
            Excellente connaissance / Mise en application forte
          </p>
          <span style={{ color: "#fff", fontSize: "1.5em" }}>
            Se perfectionner
          </span>
          <Checkbox />
        </Flex>
        <Flex
          direction="column"
          style={{
            minHeight: "50px",
            backgroundColor: "#01D1AF",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <p style={{ color: "#fff", margin: 0 }}>
            Peu de connaissance / Peu de mise en pratique
          </p>
          <span style={{ color: "#fff", fontSize: "1.5em" }}>
            Retravailler les bases
          </span>
          <Checkbox />
        </Flex>
        <Flex
          direction="column"
          style={{
            minHeight: "50px",
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <p style={{ color: "#fff", margin: 0 }}>
            Excellente connaissance / Peu de mise en application
          </p>
          <span style={{ color: "#fff", fontSize: "1.5em" }}>Oser</span>
          <Checkbox />
        </Flex>
      </Box>
    </Flex>
  );
}

export default TableActionPlan;
