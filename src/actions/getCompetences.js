import { supabase } from "@/lib/supabase";

export async function getCompetences({ id }) {

  const { data, error } = await supabase
    .from("sae_data")
    .select()
    .eq("saeId", id)

  if (error) {
    console.error(error);
  } else if (data.length > 0) {
    return data[0];
  }
  console.log("compétence récupérée", id);

  return null;
}
