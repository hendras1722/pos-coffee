'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export function useCategory() {
  const [category, setCategory] = useState<any[]>([])

  async function fetchCategory() {
    const supabase = createClient()
    let { data: category, error } = await supabase.from('category').select('*')
    if (error) return console.error(error)
    setCategory(category ?? [])
  }
  useEffect(() => {
    const getCategoryAsync = async () => {
      await fetchCategory()
    }
    getCategoryAsync()
  }, [])

  return { category }
}
