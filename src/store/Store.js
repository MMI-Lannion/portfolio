import { atom, computed } from "nanostores";

export const $but = atom("but1");

export const $saes = atom({
  but1: ["but1 1", "but1 2"],
  but2: ["but2 1", "but2 2"],
  but3: ["but3 1", "but3 2"],
});

export const $butSaes = computed($saes, (saes) => saes[$but.get()]);
