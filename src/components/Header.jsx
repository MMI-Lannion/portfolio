import { Box, Text, Link, Flex, Button } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";  // Import the icon

export function Header() {
  return (
    <header>
    <Box as="header" padding="4" backgroundColor="--accent-1" width="100%">
      <Flex justify="between" alignItems="center" gap="3" width="100%" margin="0 auto">
        {/* Logo à gauche */}
        <Flex width="200px">
          <Text size="4" color="white" width="200px">
            LOGO
          </Text>
        </Flex>
        {/* Liens centraux */}
        <Flex justifyContent="center" alignItems="center" gap="5">
          <Link href="/tutoriel" color="white">Tutoriel</Link>
          <Link href="/dashboard" color="white">Dashboard</Link>
        </Flex>
        {/* Lien de connexion utilisateur à droite */}
        <Flex width="200px" justify="end">
          <Link href="/login">
          <Button color="white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PersonIcon /> {/* Icon for Login */}
            Login
          </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
    </header>
  );
}