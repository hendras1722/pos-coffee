import { createClient } from "@/utils/supabase/server"

export interface Menu {
  id: string
  name: string
  price: number
  top_seller: boolean
  img: string
  description: string
  category: Category
  available: boolean
}

export interface Category {
  name: string;
  id?: string;
}



export async function getMenu(key?: string, value?: string | boolean | number): Promise<{ data: Menu[], error: any }> {
  const supabase = await createClient()
  if(key && value) {
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
      available`
      )
      .eq(key, value)
      .order('created_at', { ascending: false })
    const result = data as any[]
    if (!data) return { data: [], error: error }
    return {
      data: result,
      error: error,
    }
  }

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
      available`
    )
    .order('created_at', { ascending: false })
      const result = data as any[]
   if(!data) return {data: [], error: error}
  return {
    data: result,
    error: error,
  }
}