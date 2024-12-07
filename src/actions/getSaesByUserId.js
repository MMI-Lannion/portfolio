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

export async function getUserSeaData(userId, saeId) {
  console.log('getUserSeaData', userId, saeId)

  try {
    const { data, error } = await supabase.rpc('get_user_sae_data', {
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

export async function saveUserSeaData(payload) {
  try {
    const { data, error } = await supabase.from('User_Sae_Data').upsert(payload)

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error saving in User_Sae_Data:', error.message)
    return false
  }
}

export async function authenticateUser({ username, password, but }) {
  try {
    const { data, error } = await supabase
      .from('User_Data')
      .select('*')
      .eq('identifiant', username)
      .eq('mot_de_passe', password)
      .eq('but', but)

    if (error) {
      throw error
    }

    if (data?.length !== 1) {
      return null
    }

    return data[0]
  } catch (error) {
    console.error('Error fetching from User_Data:', error.message)
    return null
  }
}
