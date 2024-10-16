import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function Themes({ children }) {
  return (
    <Theme appearance="light" accentColor="pink" scaling="100%" radius="full">
      {children}
    </Theme>
  );
}
