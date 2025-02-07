'use client'
import { TableDemo } from '@/components/table'
import { Button } from '@/components/ui/button'

interface ItemType {
  name: string
  category: string
  price: string
  created_at: Date
  actions?: string
}

export const fields = [
  {
    label: 'Name Product',
    key: 'name', // TypeScript will ensure this matches a key in ItemType
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
    render: (item: ItemType, index: number) => (
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

export const items: ItemType[] = [
  {
    name: 'Kopi tubruk',
    category: 'Electronics',
    price: '$99.99',
    created_at: new Date(),
  },
]

export const RenderTable = () => {
  return (
    <div>
      <div className="ml-auto flex justify-end w-full mb-3">
        <Button className="w-fit border border-blue-400 bg-transparent text-blue-400 hover:bg-blue-400 hover:text-white">
          Add Product
        </Button>
      </div>
      <TableDemo
        fields={fields}
        items={items}
        footerContent={
          <div className="text-right font-bold">
            Total Rows: {JSON.stringify(items.length)}
          </div>
        }
      />
    </div>
  )
}
