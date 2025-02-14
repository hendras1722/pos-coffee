import { createClient } from "@/utils/supabase/server"

export interface Menu {
  created_at:  Date;
  name:        string;
  description: string;
  price:       number;
  top_seller:  string;
  img:         string;
  id:          string;
  category:          string;
}


export async function getMenu() {
   const supabase = await createClient()
  
    const { data, error } = await supabase.from('menu').select('*')

    return {
      data: data as Menu[],
      error: error
    }
}