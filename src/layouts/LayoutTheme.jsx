import Themes from "./Themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Box, Container, Separator } from "@radix-ui/themes";
import { Dialog } from "@/components/Dialog";
import { useStore } from "@nanostores/react";
import { $openDialog } from "@/store/Store";

export function LayoutTheme({ children }) {
  const openDialog = useStore($openDialog);
  return (
    <Themes>
      <Box pb="2">
        <Header />
      </Box>
      <Box m="4" style={{ height: "calc(100vh - 200px)" }}>
        {children}
      </Box>
      <Footer />
    </Themes>
  );
}
