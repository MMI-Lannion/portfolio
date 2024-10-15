import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function Themes({ children }) {
  return (
    <Theme radius="full" accentColor="indigo">
      {children}
    </Theme>
  );
}
