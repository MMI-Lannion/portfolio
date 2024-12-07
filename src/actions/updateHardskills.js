import { supabase } from '../lib/supabase.js'

export async function updateHardskills({ userId, saeId, hardskills }) {
  const { data, error } = await supabase
    .from('User_Sae_Data')
    .upsert({ user_id: userId, sae_id: aeId, hardskills })
    .eq('user_id', userId)
    .eq('id_sae', saeId)
  if (error) {
    console.error(error)
  } else {
    console.log('valid')
  }
}
