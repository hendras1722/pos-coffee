'use client'
import { Menu } from '@/actions/getMenu/actions'
import AddProduct from '@/app/admin/(dashboard)/menu/addProduct'
import { TableDemo } from '@/components/table'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import EditProduct from '@/app/admin/(dashboard)/menu/editProduct'
import AnimatedCheckbox from './checkbox'
import DeleteProduct from '@/app/admin/(dashboard)/menu/deleteProduct'

export const RenderTable = ({ data }: { data: Menu[] }) => {
  const [items, setItems] = useState<Menu[]>(data)

  const supabase = createClient()
  const getMenu = async () => {
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
      width: 'lg:w-[30px] w-[80px]',
      render: (item: Menu, index: number) => (
        <div className="flex items-center">
          <AnimatedCheckbox
            checked={item.available}
            id={index.toString()}
            onChange={async (itemCheck) => {
              const supabase = createClient()
              const { error } = await supabase
                .from('menu')
                .update({ available: itemCheck })
                .eq('id', item?.id)
                .select()
              if (error) throw error
              getMenu()
            }}
          />
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
          <DeleteProduct data={item} getData={getMenu} />
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
