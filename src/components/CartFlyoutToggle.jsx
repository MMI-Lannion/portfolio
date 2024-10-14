import { useStore } from "@nanostores/react";
import { isCartOpen } from "../cartStore";

export default function CartButton() {
  // read the store value with the `useStore` hook
  const $isCartOpen = useStore(isCartOpen);
  // write to the imported store using `.set`
  return <button onClick={() => isCartOpen.set(!$isCartOpen)}>Cart</button>;
}
