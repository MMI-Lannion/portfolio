import { atom, computed } from "nanostores";

export const $but = atom("but1");
export const $filterSea = atom("");
export const $theme = atom("light");
export const $user = atom({ username: "qdd" });

export const $saes = atom({
  but1: ["but1 1", "but1 2", "apple", "kiwi"],
  but2: ["but2 1", "but2 2"],
  but3: ["but3 1", "but3 2"],
});


export const $saesStatus = atom({
  but1: [
    {
      name: "SAE101",
      description: "Audit de communication numérique",
      completed : true
    },
    {
      name: "SAE102",
      description: "Recommandation de communication numérique",
      completed : true
    },
    {
      name: "SAE103",
      description: "Produire les éléments d'une communication visuelle",
      completed : false
    },
    {
      name: "SAE104",
      description: "Production audio et vidéo",
      completed : true
    },
    {
      name: "SAE105",
      description: "Produire un site web",
      completed : false
    },
    {
      name: "SAE106",
      description: "Gestion de projet pour une recommandation de communication numérique",
      completed : true
    }
  ],
  but2: ["but2 1", "but2 2"],
  but3: ["but3 1", "but3 2"],
});

export const $butSaes = computed([$saes, $filterSea], (saes) => {
  const but = $but.get();
  const filter = $filterSea.get();
  const butSaes = saes[but];
  return butSaes.filter((e) => e.includes(filter));
});

export const $isLoggedIn = computed($user, (user) => !!user?.username);

export const toggleTheme = () => {
  $theme.set($theme.get() === "light" ? "dark" : "light");
};
