import { supabase } from "@/lib/supabase";
import { $treemap } from "@/store/Store";

export async function GetCompetences() {

    const { data, error } = await supabase
    .from("sae_data")
    .select("competences")
    .eq("saeId", 1)
    .single();

  if (error) {
    console.error("Erreur lors de la récupération des compétences :", error);
    return;
  }

  if (data && data.competences) {
    const competences = data.competences;
    $treemap.set(competences);
    console.log("Compétences récupérées et mises à jour dans le store :", competences);
  }
}
