import { Box, Text, Link, Flex, Button } from "@radix-ui/themes";
import {
  DashboardIcon,
  InfoCircledIcon,
  MoonIcon,
  PersonIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons"; // Import the icon
import { $theme, toggleTheme } from "@/store/Store";
import { useStore } from "@nanostores/react";

export function Header() {
  const theme = useStore($theme);

  return (
    <Flex style={{ boxShadow: "var(--shadow-3)", height: 42 }}>
      <Flex
        justify="between"
        align="center"
        gap="3"
        width="100%"
        margin="0 auto"
        px="3"
      >
        {/* Logo à gauche */}
        <Flex width="200px" gap="4">
          <Link href="/">
            <RocketIcon />
          </Link>

          <Flex justify="center" align="center" gap="2">
            <Link href="/tutoriel" color="white">
              <Button variant="ghost">
                <InfoCircledIcon />
                Tutoriel
              </Button>
            </Link>
            <Link href="/dashboard" color="white">
              <Button variant="ghost">
                <DashboardIcon />
                Dashboard
              </Button>
            </Link>
          </Flex>
        </Flex>
        {/* Liens centraux */}

        {/* Lien de connexion utilisateur à droite */}
        <Flex
          width="200px"
          align="baseline"
          justify="end"
          direction="row"
          gap="4"
        >
          <Link href="/login">
            <Button
              color="white"
              variant="ghost"
              style={{ display: "flex", alignItems: "center" }}
            >
              <PersonIcon /> {/* Icon for Login */}
            </Button>
          </Link>

          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
