import { $isLoggedIn } from "@/store/Store";
import { useStore } from "@nanostores/react";
import LoginForm from "./LoginForm";
import { Home } from "./Home";

export function AuthRedirect() {
  const isLoggedIn = useStore($isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);

  return isLoggedIn ? <Home /> : <LoginForm />;
}
