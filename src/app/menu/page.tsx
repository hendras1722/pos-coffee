'use client'
import Checkout from '@/components/checkout'
import Keyboard from '@/components/keyboard'
import Struct from '@/components/struct'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useActionState } from 'react'

export default function Menu() {
  const [error, submitAction, isPending] = useActionState(
    (prevState, formData) => {
      setTimeout(() => {
        const json = formData.get('name')
        console.log(json)
      }, 5000)
    },
    null
  )
  return (
    <div className="min-h-screen flex w-full">
      <div className="p-10 flex-1">
        <h1>Cashsir App</h1>
        <form className="flex gap-3 mt-5" action={submitAction}>
          <div>
            Nama
            <Input name="name" />
          </div>
          <div>
            No meja
            <Input name="no_meja" />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="border-2 border-gray-800 w-full rounded-full my-5"></div>
        <div>
          <div className="mb-5 flex flex-wrap gap-3">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Kopi</SelectItem>
                <SelectItem value="dark">Makanan</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              className="min-w-[80px] max-w-[500px]"
              placeholder="Search"
            />
          </div>
          <div className="bg-gray-50 w-full rounded p-5 flex gap-[2%] flex-wrap content-start h-[550px] overflow-auto">
            <div
              id="card"
              className="bg-white min-h-10 md:w-[25%] lg:w-[23.5%] sm:w-full w-full mb-3 p-5 rounded-lg shadow-lg"
            >
              <title>Card</title>
              <img
                src="https://place-hold.it/300x200/ababa"
                alt="img"
                className="rounded-lg w-full h-52 object-cover"
              />
              <div className="flex justify-between">
                <div className="mt-3">
                  <h1 className="text-lg font-bold mb-2">Card</h1>
                  <p className="text-sm mt-2">Card description</p>
                </div>
              </div>
              <div className="my-3 font-semibold">Rp. 10.000</div>
              <div>
                <button className="bg-blue-500 text-white px-2 py-1 rounded w-full">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[600px] border-l-2 border-black p-5  flex-col lg:flex hidden ">
        <Struct />
        {/* <Checkout /> */}
        <div>
          <Button className="w-full bg-green-600">Print</Button>
        </div>
      </div>
    </div>
  )
}
