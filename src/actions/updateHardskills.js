import { supabase } from "../lib/supabase.js";

export async function updateHardskills({ userId, saeId, hardskills }) {
  const { data, error } = await supabase
    .from("sae_data")
    .upsert({ userId, saeId, hardskills })
    .eq("userId", userId)
    .eq("saeId", saeId);
  if (error) {
    console.error(error);
  } else {
    console.log("valid");
  }
}
