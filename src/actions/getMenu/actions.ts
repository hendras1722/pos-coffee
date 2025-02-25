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



export async function getMenu(): Promise<{ data: Menu[], error: any }> {
  const supabase = await createClient()

  const { data, error } = await supabase.from('menu').select(`
      id,
      name,
      category: category(name, id),
      price,
      top_seller,
      img,
      description`)
      const result = data as any[]
   if(!data) return {data: [], error: error}
  return {
    data: result,
    error: error,
  }
}