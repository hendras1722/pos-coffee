'use client'

import { useCategory } from '@/composable/getCategory'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useEffect, useState } from 'react'
import ArrayMap from './ArrayMap'

export default function SelectCategory() {
  const [category, setCategory] = useState<any[]>([])
  const { category: categoryData } = useCategory()

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData)
    }
  }, [categoryData])

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <ArrayMap
          of={category}
          render={(category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          )}
        />
      </SelectContent>
    </Select>
  )
}
