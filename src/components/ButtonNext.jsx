import { pointer } from "@observablehq/plot";
import { Link, Button, Flex } from "@radix-ui/themes";

export function ButtonNext({href}) {
  return (
    
    <Link href={href}>
        <Button>Prochaine étape</Button>
    </Link>
    
  );
}