import { atom, computed } from "nanostores";

export const $but = atom("but1");
export const $filterSea = atom("");

export const $saes = atom({
  but1: ["but1 1", "but1 2", "apple", "kiwi"],
  but2: ["but2 1", "but2 2"],
  but3: ["but3 1", "but3 2"],
});

export const $butSaes = computed([$saes, $filterSea], (saes) => {
  const but = $but.get();
  const filter = $filterSea.get();
  const butSaes = saes[but];
  return butSaes.filter((e) => e.includes(filter));
});
