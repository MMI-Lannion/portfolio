import Themes from "./Themes";
import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
import { Box, Separator } from "@radix-ui/themes";

export function LayoutTheme({ children }) {
  return (
    <Themes>
      <Box pb="2">
        <Header />
      </Box>
      <Box m="4">{children}</Box>
      {/* <Footer /> */}
    </Themes>
  );
}
