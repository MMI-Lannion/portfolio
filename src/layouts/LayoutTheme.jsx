import Themes from "./Themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Box, Separator } from "@radix-ui/themes";

export function LayoutTheme({ children }) {
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
