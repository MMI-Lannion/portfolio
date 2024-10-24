// actions/updateCompetences.js
import { supabase } from "@/lib/supabase";
import { $treemap } from "@/store/Store";

export async function UpdateCompetences() {
  // Récupérer les données du treemap
  const treemap = $treemap.get();

  const { data, error } = await supabase
    .from("sae_data")
    .upsert(
      { saeId: 1, competences: treemap },
      { onConflict: "saeId" }
    );

  if (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return;
  }

  console.log("Données mises à jour :", data);
}
