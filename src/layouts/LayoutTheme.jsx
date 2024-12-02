import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Box, Flex } from "@radix-ui/themes";
import Themes from "./Themes";

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Flex direction="column" style={{ minHeight: "100vh" }}>
        <Box pb="2">
          <Header />
        </Box>
        <Box
          m="auto"
          maxWidth={{ base: "100%", lg: "900px" }}
          width="100%"
          px={{ base: "4", md: "6" }}
          flex="1"
        >
          {children}
        </Box>
        <Box mt="auto" pb="2">
          <Footer />
        </Box>
      </Flex>
    </Themes>
  );
}
