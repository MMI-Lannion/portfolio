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
        px="5"
      >
        {/* Logo à gauche */}
        <Flex width="200px" gap="6">
          <Link href="/">
            <RocketIcon height="22" width="22" />
          </Link>

          <Flex justify="center" align="center" gap="4">
            <Link href="/tutoriel" color="white">
              <Button variant="ghost" size="4">
                <InfoCircledIcon height="22" width="22" />
                Tutoriel
              </Button>
            </Link>
            <Link href="/dashboard" color="white">
              <Button variant="ghost" size="4">
                <DashboardIcon height="22" width="22" />
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
          gap="5"
        >
          <Link href="/login">
            <Button
              variant="ghost"
              size="4"
              style={{ display: "flex", alignItems: "center" }}
            >
              <PersonIcon height="22" width="22" /> {/* Icon for Login */}
            </Button>
          </Link>

          <Button variant="ghost" size="4" onClick={toggleTheme}>
            {theme === "dark" ? (
              <SunIcon height="22" width="22" />
            ) : (
              <MoonIcon height="22" width="22" />
            )}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
