import { $theme } from "@/store/Store";
import { useStore } from "@nanostores/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function Themes({ children }) {
  const theme = useStore($theme);

  return (
    <Theme appearance={theme} accentColor="pink" scaling="100%" radius="full">
      {children}
    </Theme>
  );
}
