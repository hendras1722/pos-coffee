import { createClient } from '@/utils/supabase/client'

export interface Menu {
  id: string
  name: string
  price: number
  top_seller: boolean
  img: string
  description: string
  category: Category
}

export interface Category {
  name: string
  id?: string
}

export async function getMenuClient(): Promise<{ data: Menu[]; error: any }> {
  const supabase =  createClient()

  const { data, error } = await supabase
    .from('menu')
    .select(
      `
         id,
      name,
      category: category(name, id),
      price,
      top_seller,
      img,
      description,
      available
      `
    )
    .order('created_at', { ascending: false })
  const result = data as any[]
  if (!data) return { data: [], error: error }
  return {
    data: result,
    error: error,
  }
}
