import Themes from "./Themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Box, Container, Separator, Flex } from "@radix-ui/themes";
import { Dialog } from "@/components/Dialog";
import { useStore } from "@nanostores/react";
import { $openDialog } from "@/store/Store";

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Flex direction="column" justify="between">
        <Box pb="2">
          <Header />
        </Box>
        <Box m="4">{children}</Box>
        <Box pb="2">
          <Footer />
        </Box>
      </Flex>
    </Themes>
  );
}
