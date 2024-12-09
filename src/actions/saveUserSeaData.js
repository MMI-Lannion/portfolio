import { supabase } from '@/lib/supabase'

export async function saveUserSeaData(payload) {
  try {
    const { error } = await supabase.from('User_Sae_Data').upsert(payload)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error saving in User_Sae_Data:', error.message)
    return false
  }
}
