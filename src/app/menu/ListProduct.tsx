'use client'

import { type Menu } from '@/actions/getMenu/actions'
import ArrayMap from '@/components/ArrayMap'
import { useCheckoutMenu } from '@/store/checkout'
import Image from 'next/image'

export default function ListProduct({
  data,
}: Readonly<{
  data: Menu[]
}>) {
  const { checkoutAction } = useCheckoutMenu()
  const handleAddProduct = (product: Menu) => {
    checkoutAction(product)
  }
  return (
    <ArrayMap
      of={data}
      render={(item, index) => (
        <div
          key={index}
          id="card"
          className="bg-white min-h-10 md:w-[25%] lg:w-[23.5%] sm:w-full w-full mb-3 p-5 rounded-lg shadow-lg"
        >
          <Image
            src={
              'https://tikuwnepqhtjbypmcsst.supabase.co/storage/v1/object/' +
              item.img
            }
            width={0}
            height={0}
            className="mt-5 w-52 h-52 object-cover object-center rounded"
            alt="bg_cafe"
            unoptimized
          />
          <div className="flex justify-between">
            <div className="mt-3">
              <h1 className="text-lg font-bold mb-2">{item.name}</h1>
              <p className="text-sm mt-2 line-clamp-2">{item.description}</p>
            </div>
          </div>
          <div className="my-3 font-semibold">Rp. 10.000</div>
          <div>
            <button
              onClick={() => handleAddProduct(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded w-full"
            >
              Buy
            </button>
          </div>
        </div>
      )}
    />
  )
}
