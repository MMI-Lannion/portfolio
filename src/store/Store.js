import { getCompetences } from '@/actions/getCompetences'
import {
  authenticateUser,
  getSaesByUserId,
  getUserSeaData,
  saveUserSeaData,
} from '@/actions/getSaesByUserId'
import { persistentAtom } from '@nanostores/persistent'
import { atom, computed } from 'nanostores'

export const $filterSea = atom('')
export const $theme = atom('light')
export const $userSeas = atom([])

export const $user = persistentAtom(
  'user',
  {
    // username: "mmi1",
    // but: "BUT1",
    // id: 1,
    valide: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
)
export const $forceReload = persistentAtom('reload', false)
export const $sae = persistentAtom('sae', '')
export const $saeData = persistentAtom(
  'saeData',
  {
    completed: false,
    // page : synthèse
    competences: [],
    contexte: '',
    demarche: '',
    livrable: '',
    fichiers: [],
    // page : auto-evaluation
    hardskills: [],
    softskills: [],
    outils: {},
    // page : plan d'action
    axeAmelioration: '',
    competenceCle: '',
    sousCompetences: [],
    actions: '',
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
)

export const $but = computed($user, (d) => d?.but)
export const $username = computed($user, (d) => d?.username)
export const $isLoggedIn = computed($user, (d) => d?.valide)
export const $filterCompetence = computed($saeData, (d) => d?.competenceCle)
export const $competencesCles = computed([$saeData, $filterSea], (saeData) => {
  const filter = $filterSea.get()
  const competencesCle = saeData.hardskills
  return competencesCle
    .filter((e) => e.name?.toLowerCase().includes(filter.toLowerCase()))
    .map((e) => e.name)
})
export const $sousCompetences = computed([$saeData], (saeData) => {
  return saeData.hardskills?.find((e) => e.name === saeData.competenceCle)?.data
})

export const $loadUserSaes = async () => {
  const userId = $user.get().id
  const data = await getSaesByUserId(userId)
  $userSeas.set(data)
  $forceReload.set(true)
}

export const $setSae = async (saeName) => {
  $sae.set(saeName)
}

export const $loadUserSaeData = async () => {
  if ($forceReload.get()) {
    const data = await getUserSeaData($user.get().id, $sae.get())
    $setSaeData(data)
    $forceReload.set(false)
  }
  console.log('load data loadUserSaeData', $saeData.get())
}

export const $saveSaeData = async () => {
  const {
    competences,
    contexte,
    demarche,
    livrable,
    fichiers,
    hardskills,
    softskills,
    outils,
    actions,
    axeAmelioration: axe_amelioration,
    competenceCle: competence_cle,
    sousCompetences: sous_competences,
  } = $saeData.get()

  const result = await saveUserSeaData({
    id_sae: $sae.get(),
    user_id: $user.get().id,
    completed: true,
    competences,
    contexte,
    demarche,
    livrable,
    fichiers,
    hardskills,
    softskills,
    outils,
    actions,
    axe_amelioration,
    competence_cle,
    sous_competences,
  })

  if (result) {
    $setSaeData({ completed: true })
  }

  return result
}

export const $setSaeData = (data) => {
  const previousData = $saeData.get()
  $saeData.set({ ...previousData, ...data })
}

export const $toggleTheme = () => {
  const theme = $theme.get()
  $theme.set(theme === 'light' ? 'dark' : 'light')
}

//mettre pourcentage en fonction du nombre de blocs de compétences
export const $setInitialPourcentage = () => {
  let treemapData = $saeData.get().competences
  const totalSkills = treemapData.length

  const newPercentage = 100 / totalSkills

  treemapData = treemapData.map((e) => ({
    ...e,
    percentage: newPercentage % 5 === 0 ? newPercentage : 30,
  }))

  $setSaeData({ competences: treemapData })
}

//changer pourcentage en fonction du Slider
export const $changeValueSlider = (key, value) => {
  let treemapData = $saeData.get().competences

  treemapData = treemapData.map((e) => {
    if (e.key === key) {
      return { ...e, percentage: value }
    } else {
      return e
    }
  })

  $setSaeData({ competences: treemapData })
}

//total pourcentage
export const $totalPourcentage = () => {
  const total = $saeData.get().competences.reduce((acc, e) => {
    return acc + Number(e.percentage)
  }, 0)

  return total
}

export const $addKeyWord = (key, keyword) => {
  let treemapData = $saeData.get().competences

  treemapData = treemapData.map((e) => {
    if (e.key === key && !e.keywords.includes(keyword)) {
      return { ...e, keywords: [...e.keywords, keyword] }
    } else {
      return e
    }
  })

  $setSaeData({ competences: treemapData })
}

export const $deleteKeyWord = (key, keyword) => {
  let treemapData = $saeData.get().competences

  treemapData = treemapData.map((e) => {
    if (e.key === key) {
      return { ...e, keywords: e.keywords.filter((k) => k !== keyword) }
    } else {
      return e
    }
  })

  $setSaeData({ competences: treemapData })
}

export const $updatePercentage = () => {
  let treemapData = $saeData.get().competences
  let globalLength = 0

  treemapData.forEach((child) => {
    globalLength = globalLength + child.keywords.length
  })

  treemapData = treemapData.map((e) => {
    e.percentage = (e.keywords.length / globalLength) * 100
    return e
  })

  $setSaeData({ competences: treemapData })
}

export const $updateHardskills = ({ competence, label, value }) => {
  const updatedHardSkills = $saeData.get().hardskills.map((comp) => {
    if (comp.name === competence) {
      return { ...comp, data: { ...comp.data, [label]: value } }
    }
    return comp
  })

  console.log('updated hardskills', updatedHardSkills)

  $setSaeData({ hardskills: updatedHardSkills })
}

export const $updateTools = ({ label, value }) => {
  $setSaeData({ outils: { ...$saeData.get().outils, [label]: value } })
}

export const $updateCompetenceCle = (competenceName) => {
  $setSaeData({ competenceCle: competenceName })
}

export const $updateSousCompetences = (value) => {
  $setSaeData({ sousCompetences: value })
}

export const $updateAxeAmelioration = (value) => {
  $setSaeData({ axeAmelioration: value })
}

export const $setUser = (data) => {
  $user.set({ ...$user.get(), ...data })
}

export const $login = async () => {
  const { username, password, but } = $user.get()
  const data = await authenticateUser({ username, password, but })

  if (data?.identifiant) {
    $user.set({
      id: data.id,
      firstname: data.prenom,
      username,
      // password,
      but,
      valide: true,
    })
    return true
  }
  return false
}

export const $logout = async () => {
  $user.set({
    valide: false,
  })
}

export const competences = async () => {
  const competences = await getCompetences($saeData.get().saeId)
  if (competences?.saeId) {
    $saeData.set({ ...competences, valide: true })
    return true
  }
  return false
}

export const setSoftskills = async (softskills) => {
  const previousData = $saeData.get()
  const { userId, saeId } = previousData
  $saeData.set({ ...previousData, softskills })
  await updateSoftskillsInDatabase(userId, saeId, softskills)
}
