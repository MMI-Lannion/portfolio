import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function LayoutTheme({ children }) {
  return <Theme>{children}</Theme>;
}
