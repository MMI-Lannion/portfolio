import { atom, computed } from "nanostores";

export const $but = atom("but1");
export const $filterSea = atom("");
export const $theme = atom("light");
export const $user = atom({ username: "qdd" });
export const $openDialog = atom(true);
export const $sae = atom("sae");

export const $saeData = atom({
  userId: 1,
  saeId: 101,
  completed: false,
  competences: [],
  contexte: "",
  demarche: "",
  livrable: "",
  files: [],
  hardskills: [
    {
      name: "Compétence 1",
      label31: 0.02,
      label32: 0.18,
      label33: 0.39,
      label34: 0.27,
      label35: 0.17,
      label36: 0.12,
    },
    {
      name: "Compétence 2",
      label31: 0.27,
      label32: 0.18,
      label33: 0.39,
      label34: 0.02,
      label35: 0.17,
      label36: 0.12,
    },
  ],
  softskills: {},
  ameliorations: {},
  competenceCle: "",
  sousCompetence: [],
});

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
    { key: "Comprendre", color: "red", percentage: 25, keywords: ["ahhhhh"] },
    { key: "Concevoir", color: "orange", percentage: 25, keywords: ["er"] },
    {
      key: "Produire",
      color: "yellow",
      percentage: 25,
      keywords: ["test", "toto"],
    },
    {
      key: "Développer",
      color: "green",
      percentage: 25,
      keywords: ["Competence"],
    },
    {
      key: "Entreprendre",
      color: "blue",
      percentage: 25,
      keywords: ["a", "b", "c"],
    },
  ],
});

export const $addKeyWord = (key, keyword) => {
  const treemapData = $treemap.get();

  // Find and update the specific child with the matching key
  const updatedChildren = treemapData.children.map((child) => {
    if (child.key === key) {
      // Add the new keyword to the `keywords` array if it doesn't already exist
      if (!child.keywords.includes(keyword)) {
        child.keywords.push(keyword);
      }
    }
    return child;
  });

  // Set the updated children back to the atom
  $treemap.set({
    ...treemapData,
    children: updatedChildren,
  });

  // Optional: log the updated state
  console.log($treemap.get().children);
};

export const $updatePercentage = () => {
  const treemapData = $treemap.get();
  let globalLength = 0;

  const checkLength = treemapData.children.map((child) => {
    globalLength = globalLength + child.keywords.length;
  });

  console.log(globalLength);

  const updatedChildren = treemapData.children.map((child) => {
    child.percentage = (child.keywords.length / globalLength) * 100;
    return child;
  });

  // Set the updated children back to the atom
  $treemap.set({
    ...treemapData,
    children: updatedChildren,
  });
};

export const $deleteKeyWord = (key, keyword) => {
  // Get the current state of the treemap
  const treemapData = $treemap.get();

  // Find and update the specific child with the matching key
  const updatedChildren = treemapData.children.map((child) => {
    if (child.key === key) {
      // Remove the keyword from the `keywords` array if it exists
      return {
        ...child,
        keywords: child.keywords.filter((k) => k !== keyword),
      };
    }
    return child;
  });

  // Set the updated children back to the atom
  $treemap.set({
    ...treemapData,
    children: updatedChildren,
  });

  // Optional: log the updated state
  console.log($treemap.get().children);
};

//mettre pourcentage en fonction du nombre de blocs de compétences
export const $setInitialPourcentage = () => {
  const totalSkills = $treemap.get().children.length;
  const newPercentage = 100 / totalSkills;
  $treemap.set({
    children: $treemap.get().children.map((e) => ({
      ...e,
      percentage: newPercentage % 5 === 0 ? newPercentage : 30,
    })),
  });
};

//changer pourcentage en fonction du Slider
export const $changeValueSlider = (key, value) => {
  $treemap.set({
    children: $treemap.get().children.map((e) => {
      if (e.key === key) {
        return { ...e, percentage: value };
      } else {
        return e;
      }
    }),
  });
};

//total pourcentage
export const $totalPourcentage = () => {
  /*let total = $treemap.get().children.reduce((acc, e) => {
    return acc + Number(e.percentage);
  }, 0);*/
  let total = 100;
  return total;
};
