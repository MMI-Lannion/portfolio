import { supabase } from '@/lib/supabase'
import { $saeData } from '@/store/Store'

// --------------------- WIP ---------------------

export async function getUser({ userId, saeId }) {
  const { data, error } = await supabase
    .from('user')
    .select()
    .eq('but', but)
    .eq('username', username)
    .eq('password', password)

  if (error) {
    console.error(error)
  } else if (data.length > 0) {
    return data[0]
  }

  console.log('user jkhaz', but, username, password, data, error)
  return null
}
