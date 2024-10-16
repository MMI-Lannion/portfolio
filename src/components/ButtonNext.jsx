import { pointer } from "@observablehq/plot";
import { Link, Button, Flex } from "@radix-ui/themes";

export function ButtonNext({href, name}) {
  return (
    
    <Link href={href}>
        <Button>{name}</Button>
    </Link>
    
  );
}