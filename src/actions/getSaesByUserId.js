import { supabase } from '@/lib/supabase'

export async function getSaesByUserId(userId) {
  try {
    const { data, error } = await supabase.rpc('get_distinct_sae_for_user', {
      p_user_id: userId,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching distinct SAE:', error.message)
    return []
  }
}
