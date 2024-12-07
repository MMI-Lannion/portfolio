import AuthRedirect from '@/pages/AuthRedirect'
import AutoEvaluation from '@/pages/AutoEvaluation'
import Feedback from '@/pages/Feedback'
import MentionsLegales from '@/pages/MentionsLegales'
import Merci from '@/pages/Merci'
import PlanActions from '@/pages/PlanActions'
import Synthese from '@/pages/Synthese'
import Tutoriel from '@/pages/Tutoriel'
import { usePath, useRoutes } from 'raviger'
import { LayoutTheme } from './LayoutTheme'
import DemarchePortfollio from '@/pages/DemarchePortfollio'
import { useEffect } from 'react'

const routes = {
  '/': () => <AuthRedirect />,
  '/synthese': () => <Synthese />,
  '/auto-evaluation': () => <AutoEvaluation />,
  '/plan-actions': () => <PlanActions />,
  '/feedback': () => <Feedback />,
  '/merci': () => <Merci />,
  '/tutoriel': () => <Tutoriel />,
  '/mentions-legales': () => <MentionsLegales />,
  '/demarche-portfollio': () => <DemarchePortfollio />,
}

export function Router() {
  const currentPath = usePath()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPath])

  const routeResult = useRoutes(routes)

  return <LayoutTheme>{routeResult}</LayoutTheme>
}
