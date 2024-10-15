import { Box, Text, Link, Flex } from "@radix-ui/themes";

export function Footer() {
    return (
        <footer width="100%">
            {/* ajouter tout les element nécéssaire à un footer comme les liens, les informations de contact ou les réseaux sociaux ou les mentions légales ou les crédits ou les droits d'auteurs */}
            <Box padding="4" panelBackground="translucent" width="100%">
                    <Flex justify="between" alignItems="center" gap="3" width="100%" margin="0 auto">
                    <Flex width="200px" justify="end">
                        <Link href="/" color="white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            © 2021 Portfolio de IUT Lannion
                        </Link>
                    </Flex>
                    <Flex width="200px" justify="end">
                        <Link href="/" color="white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Mentions légales
                        </Link>
                    </Flex>
                    <Flex width="200px" justify="end">
                        <Link href="/" color="white" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Privacy Policy
                        </Link>
                    </Flex>
                    </Flex>
            </Box>

        </footer>
    );
    }