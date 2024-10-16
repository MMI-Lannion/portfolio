import { Box, Text, Link, Flex, Button } from "@radix-ui/themes";
import {
  DashboardIcon,
  InfoCircledIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons"; // Import the icon
import { $theme, toggleTheme } from "@/store/Store";
import { useStore } from "@nanostores/react";

export function Header() {
  const theme = useStore($theme);

  return (
    <header style={{ boxShadow: "var(--shadow-3)" }}>
      <Box as="header" p="4" backgroundColor="--accent-1" width="100%">
        <Flex
          justify="between"
          alignItems="center"
          gap="3"
          width="100%"
          margin="0 auto"
        >
          {/* Logo à gauche */}
          <Flex width="200px" gap="4">
            <Text size="4" color="white" width="200px">
              🤗
            </Text>

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
      </Box>
    </header>
  );
}
