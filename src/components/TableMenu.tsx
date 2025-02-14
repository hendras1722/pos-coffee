'use client'
import { Menu } from '@/actions/getMenu/actions'
import { TableDemo } from '@/components/table'
import { Button } from '@/components/ui/button'
import { useStoreMenu } from '@/store/menu'
import { useEffect, useRef } from 'react'

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
  },
  {
    label: 'Price',
    key: 'price',
    width: 'lg:w-[330px] w-[80px]',
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
  const items = useRef(data)

  const storeMenu = useStoreMenu()
  useEffect(() => {
    items.current = storeMenu.menu
    // Conditionally clear the menu on mount if there's data
    if (storeMenu.menu.length > 0) {
      storeMenu.removeAction() // Correctly call the removeAction
    }
  }, [storeMenu.menu, storeMenu.removeAction]) // Depend on storeMenu.menu AND storeMenu.removeAction
  return (
    <div>
      <TableDemo
        fields={fields}
        items={items.current}
        footerContent={
          <div className="text-right font-bold">
            Total Rows: {JSON.stringify((items.current || []).length)}
          </div>
        }
      />
    </div>
  )
}
