'use client'
import { Menu } from '@/actions/getMenu/actions'
import AddProduct from '@/app/admin/(dashboard)/menu/addProduct'
import { TableDemo } from '@/components/table'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import NumberInput from './InputCurrency'

export const fields = [
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
    width: 'lg:w-[330px] w-[80px]',
    render: (item: Menu) => (
      <div className="flex items-center space-x-2">
        <NumberInput
          value={String(item.price)}
          onChange={() => {}}
          disabled
          className="!w-[200px] border-transparent disabled:cursor-auto disabled:!text-black"
          leading={<span>Rp.</span>}
        ></NumberInput>
      </div>
    ),
  },

  {
    label: 'Actions',
    key: 'actions',
    width: 'lg:w-[330px] w-[80px]',
    render: (item: Menu, index: number) => (
      <div className="flex items-center space-x-2">
        <Button className="border border-green-400 bg-transparent text-green-400 hover:bg-green-400 hover:text-white btn btn-sm">
          Edit
        </Button>
        <Button className="border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white">
          Delete
        </Button>
      </div>
    ),
  },
]

export const RenderTable = ({ data }: { data: Menu[] }) => {
  const [items, setItems] = useState<Menu[]>(data)
  const supabase = createClient()
  const getMenu = async () => {
    const { data, error } = await supabase.from('menu').select(`
         id,
      name,
      category: category(name),
      price,
      top_seller,
      img,
      description
      `)
    setItems(data as any[])
    if (error) console.log(error)
  }
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
