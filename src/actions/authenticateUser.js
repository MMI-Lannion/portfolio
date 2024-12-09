import { supabase } from '@/lib/supabase'

export async function authenticateUser({ username, password, but }) {
  try {
    const { data, error } = await supabase.rpc('check_valid_user', {
      p_username: username,
      p_password: password,
      p_user_but: but,
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching from User_Data:', error.message)
    return null
  }
}
