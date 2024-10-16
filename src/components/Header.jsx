import { Box, Text, Link, Flex, Button } from "@radix-ui/themes";
import { MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons"; // Import the icon
import { $theme, toggleTheme } from "@/store/Store";
import { useStore } from "@nanostores/react";

export function Header() {
  const theme = useStore($theme);

  return (
    <header>
      <Box as="header" p="4" backgroundColor="--accent-1" width="100%">
        <Flex
          justify="between"
          alignItems="center"
          gap="3"
          width="100%"
          margin="0 auto"
        >
          {/* Logo à gauche */}
          <Flex width="200px">
            <Text size="4" color="white" width="200px">
              LOGO
            </Text>
          </Flex>
          {/* Liens centraux */}
          <Flex justifyContent="center" alignItems="center" gap="5">
            <Link href="/tutoriel" color="white">
              Tutoriel
            </Link>
            <Link href="/dashboard" color="white">
              Dashboard
            </Link>
          </Flex>
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
