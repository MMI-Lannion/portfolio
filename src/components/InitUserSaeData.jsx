import { $loadUserSaeData } from "@/store/Store";
import { useEffect } from "react";

export function InitUserSaeData() {
  useEffect(() => {
    setTimeout(async () => {
      await $loadUserSaeData();
    }, 0);
  });

  return <></>;
}
