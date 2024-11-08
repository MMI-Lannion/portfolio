import { getUser } from "@/actions/getUser";
import { getCompetences } from "@/actions/getCompetences";
import { atom, computed } from "nanostores";

export const $filterSea = atom("");
export const $theme = atom("light");
export const $user = atom({ username: "mmi1", but: "but1", valide: true });
export const $openDialog = atom(true);
export const $sae = atom("sae");

export const $but = computed($user, (user) => user?.but);
export const $username = computed($user, (user) => user?.username);
export const $isLoggedIn = computed($user, (user) => user?.valide);

export const $saeData = atom({
  userId: 1,
  saeId: 101,
  completed: false,
  competences: [
    { key: "Comprendre", color: "red", percentage: 25, keywords: ["ahhhhh"] },
    { key: "Concevoir", color: "orange", percentage: 25, keywords: ["er"] },
    { key: "Produire", color: "yellow", percentage: 25, keywords: [] },
    { key: "Développer", color: "green", percentage: 25, keywords: [] },
    { key: "Entreprendre", color: "blue", percentage: 25, keywords: [] },
  ],
  contexte: "",
  demarche: "",
  livrable: "",
  files: [],
  hardskills: [
    {
      name: "Compétence 1",
      label31: 0.1,
      label32: 0.2,
      label33: 0.3,
      label34: 0.4,
      label35: 0.5,
      label36: 0.1,
    },
    {
      name: "Compétence 2",
      label31: 0.5,
      label32: 0.4,
      label33: 0.3,
      label34: 0.2,
      label35: 0.1,
      label36: 0.5,
    },
  ],
  softskills: ["49283701"],
  ameliorations: {},
  competenceCle: "",
  sousCompetence: [
    {
      label1: "name",
      checked: false,
    },
    {
      label2: "name",
      checked: false,
    },
    {
      label3: "name",
      checked: false,
    },
    {
      label4: "name",
      checked: false,
    },
  ],
});

export const $saes = atom({
  but1: ["but1 1", "but1 2", "apple", "kiwi"],
  but2: ["but2 1", "but2 2"],
  but3: ["but3 1", "but3 2"],
});

export const $competencesCles = atom({
  competence_cles: [
    { name: "Premiere pro", checked: true },
    { name: "Da Vinci Resolve", checked: false },
    { name: "After Effects", checked: false },
  ],
  sous_competences: [
    { name: "Ecriture", checked: false },
    { name: "Tournage", checked: false },
    { name: "Montage", checked: false },
  ],
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

export const toggleTheme = () => {
  const theme = $theme.get();
  $theme.set(theme === "light" ? "dark" : "light");
};

//données Treemap
export const $treemap = atom([
  { key: "Comprendre", color: "red", percentage: 25, keywords: ["ahhhhh"] },
  { key: "Concevoir", color: "orange", percentage: 25, keywords: ["er"] },
  { key: "Produire", color: "yellow", percentage: 25, keywords: [] },
  { key: "Développer", color: "green", percentage: 25, keywords: [] },
  { key: "Entreprendre", color: "blue", percentage: 25, keywords: [] },
]);

//mettre pourcentage en fonction du nombre de blocs de compétences
export const $setInitialPourcentage = () => {
  const totalSkills = $treemap.get().length;
  const newPercentage = 100 / totalSkills;

  $treemap.set(
    $treemap.get().map((e) => ({
      ...e,
      percentage: newPercentage % 5 === 0 ? newPercentage : 30,
    }))
  );
};

//changer pourcentage en fonction du Slider
export const $changeValueSlider = (key, value) => {
  $treemap.set(
    $treemap.get().map((e) => {
      if (e.key === key) {
        return { ...e, percentage: value };
      } else {
        return e;
      }
    })
  );
};

//total pourcentage
export const $totalPourcentage = () => {
  let total = $treemap.get().reduce((acc, e) => {
    return acc + Number(e.percentage);
  }, 0);
  return total;
};

export const $addKeyWord = (key, keyword) => {
  $treemap.set(
    $treemap.get().map((e) => {
      if (e.key === key && !e.keywords.includes(keyword)) {
        return { ...e, keywords: [...e.keywords, keyword] };
      } else {
        return e;
      }
    })
  );
};

export const $deleteKeyWord = (key, keyword) => {
  $treemap.set(
    $treemap.get().map((e) => {
      if (e.key === key) {
        return { ...e, keywords: e.keywords.filter((k) => k !== keyword) };
      } else {
        return e;
      }
    })
  );
};

export const $updatePercentage = () => {
  const treemapData = $treemap.get();
  let globalLength = 0;
  treemapData.forEach((child) => {
    globalLength = globalLength + child.keywords.length;
  });

  $treemap.set(
    treemapData.map((e) => {
      e.percentage = (e.keywords.length / globalLength) * 100;
      return e;
    })
  );
};

export const setSaeData = (data) => {
  const previousData = $saeData.get();
  $saeData.set({ ...previousData, ...data });
};

export const setUser = (data) => {
  $user.set({ ...$user.get(), ...data });
};

export const login = async () => {
  const user = await getUser($user.get());
  if (user?.username) {
    $user.set({ ...user, valide: true });
    return true;
  }
  return false;
};

export const competences = async () => {
  const competences = await getCompetences($saeData.get().saeId);
  if (competences?.saeId) {
    $saeData.set({ ...competences, valide: true });
    return true;
  }
  return false;
};

export const setSoftskills = async (softskills) => {
  const previousData = $saeData.get();
  const { userId, saeId } = previousData;
  $saeData.set({ ...previousData, softskills });
  await updateSoftskillsInDatabase(userId, saeId, softskills);
};
