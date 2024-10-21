import { atom, computed } from "nanostores";

export const $but = atom("but1");
export const $filterSea = atom("");
export const $theme = atom("light");
export const $user = atom({ username: "qdd" });
export const $openDialog = atom(true);

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
      completed: true,
    },
    {
      name: "SAE102",
      description: "Recommandation de communication numérique",
      completed: true,
    },
    {
      name: "SAE103",
      description: "Produire les éléments d'une communication visuelle",
      completed: false,
    },
    {
      name: "SAE104",
      description: "Production audio et vidéo",
      completed: true,
    },
    {
      name: "SAE105",
      description: "Produire un site web",
      completed: false,
    },
    {
      name: "SAE106",
      description:
        "Gestion de projet pour une recommandation de communication numérique",
      completed: true,
    },
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
  const theme = $theme.get();
  $theme.set(theme === "light" ? "dark" : "light");
};

//données Treemap
export const $treemap = atom({
  children: [
    { key: "Comprendre", color: "red", percentage: 25, keywords: ["ahhhhh"],},
    { key: "Concevoir", color: "orange", percentage: 25, keywords: ["er"] },
    { key: "Produire", color: "yellow", percentage: 25, keywords: [] },
    { key: "Développer", color: "green", percentage: 25, keywords: [] },
    { key: "Entreprendre", color: "blue", percentage: 25, keywords: [] },
  ]}
);

//mettre pourcentage en fonction du nombre de blocs de compétences
export const $setInitialPourcentage = () => {
  const totalSkills = $treemap.get().children.length;
  const newPercentage = 100 / totalSkills;
  $treemap.set({
    children : $treemap.get().children.map((e) => ({
      ...e,
      percentage: newPercentage % 5 === 0 ? newPercentage : 30,
    })),
  })
}

//changer pourcentage en fonction du Slider
export const $changeValueSlider = (key, value) => {
  $treemap.set({
    children : $treemap.get().children.map((e) => {
      if (e.key === key) {
        return { ...e, percentage: value };
      } else {
        return e;
      }
    })
  })
}

//total pourcentage
export const $totalPourcentage = () => {
  let total = $treemap.get().children.reduce((acc, e) => {
    return acc + Number(e.percentage);
  }, 0);
  return total
}