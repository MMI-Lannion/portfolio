import { pointer } from "@observablehq/plot";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, Button, Flex } from "@radix-ui/themes";

export function ButtonNext({ href, name, onClick = null }) {
  return (
    <Link href={href}>
      <Button size="4" variant="surface" onClick>
        {name}
        <ArrowRightIcon />
      </Button>
    </Link>
  );
}

export function ButtonPrev({ href, name, onClick = null }) {
  return (
    <Link href={href}>
      <Button size="4" variant="surface" onClick>
        <ArrowLeftIcon />
        {name}
      </Button>
    </Link>
  );
}
