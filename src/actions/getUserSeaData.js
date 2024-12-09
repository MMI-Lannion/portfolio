import { supabase } from '@/lib/supabase'

export async function getUserSeaData(userId, saeId) {
  try {
    const { data, error } = await supabase.rpc('get_user_sae_datav2', {
      p_user_id: userId,
      p_id_sae: saeId,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching distinct SAE:', error.message)
    return null
  }
}
