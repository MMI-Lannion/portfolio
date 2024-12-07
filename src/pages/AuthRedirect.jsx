import { $isLoggedIn } from '@/store/Store'
import { useStore } from '@nanostores/react'
import LoginForm from '../components/LoginForm'
import { Home } from '../components/Home'

export default function AuthRedirect() {
  const isLoggedIn = useStore($isLoggedIn)

  return isLoggedIn ? <Home /> : <LoginForm />
}
