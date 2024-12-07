import { supabase } from '@/lib/supabase'

export async function getUser({ but, username, password }) {
  // with promise
  // ----
  // const promise = supabase
  //   .from("user")
  //   .select()
  //   .eq("but", but)
  //   .eq("username", username)
  //   .eq("password", password);

  // return promise.then(({ data, error }) => {
  //   if (error) {
  //     console.error(error);
  //   } else if (data.length > 0) {
  //     return data[0];
  //   }
  //   console.log("user jkhaz", but, username, password, data, error);

  //   return null;
  // });

  // with await
  // ----
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
