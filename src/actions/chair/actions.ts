import { createClient } from '@/utils/supabase/server'

export async function getChair<T>() {
  const supabase = await createClient()

  let { data: chair, error } = await supabase.from('chair').select('*')
  if (error) return error

  return chair as T
}
