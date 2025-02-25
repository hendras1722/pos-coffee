'use client'
import { Menu } from '@/actions/getMenu/actions'
import AddProduct from '@/app/admin/(dashboard)/menu/addProduct'
import { TableDemo } from '@/components/table'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import NumberInput from './InputCurrency'
import EditProduct from '@/app/admin/(dashboard)/menu/editProduct'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export const RenderTable = ({ data }: { data: Menu[] }) => {
  const [items, setItems] = useState<Menu[]>(data)
  const supabase = createClient()
  const getMenu = async () => {
    const { data, error } = await supabase.from('menu').select(`
         id,
      name,
      category: category(name, id),
      price,
      top_seller,
      img,
      description
      `)
    setItems(data as any[])
    if (error) console.log(error)
  }
  const fields = [
    {
      label: 'Name Product',
      key: 'name',
      width: 'lg:w-[430px] w-[80px]',
    },
    {
      label: 'Category',
      key: 'category',
      width: 'lg:w-[130px] w-[50px]',
      render: (item: Menu, index: number) => (
        <div className="flex items-center space-x-2">
          <span>{item.category?.name}</span>
        </div>
      ),
    },
    {
      label: 'Price',
      key: 'price',
      width: 'lg:w-[130px] w-[80px]',
      render: (item: Menu) => (
        <div>
          {item.price
            .toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })
            .replace(',00', '')}
        </div>
      ),
    },
    {
      label: 'Available',
      key: 'available',
      render: (item: Menu) => (
        <div className="flex items-center space-x-2">
          <Select defaultValue={String(item.available)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Available" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },

    {
      label: 'Actions',
      key: 'actions',
      width: 'lg:w-[330px] w-[80px]',
      render: (item: Menu, index: number) => (
        <div className="flex items-center space-x-2">
          <EditProduct data={item} getData={getMenu} />
          <Button className="border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white">
            Delete
          </Button>
        </div>
      ),
    },
  ]
  return (
    <div>
      <div className="ml-auto flex justify-end w-full mb-3">
        <AddProduct getData={getMenu} />
      </div>
      <TableDemo
        fields={fields}
        items={items}
        footerContent={
          <div className="text-right font-bold">
            Total Rows: {JSON.stringify((items || []).length)}
          </div>
        }
      />
    </div>
  )
}
