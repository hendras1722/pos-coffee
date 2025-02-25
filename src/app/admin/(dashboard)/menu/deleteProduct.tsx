'use client'

import { Button } from '@/components/ui/button'
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRef, useState, useTransition } from 'react'
import { createClient } from '@/utils/supabase/client'

import { Menu } from '@/actions/getMenu/actions'

export default function DeleteProduct({
  data,
  getData,
}: Readonly<{
  data: Menu
  getData: () => void
}>) {
  const [isPending, startTransition] = useTransition()
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function onSubmit() {
    startTransition(async () => {
      const supabase = createClient()

      const { error } = await supabase.from('menu').delete().eq('id', data?.id)
      if (error) throw Error('Failed to delete data')
      startTransition(async () => {
        getData()
        setIsModalOpen(false)
      })
    })
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="border border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Delete Product</DialogTitle>
        <div className="mb-16">Do you really want to delete this data?</div>
        <DialogFooter className="block">
          <div className="block w-full">
            <div>
              <Button
                disabled={isPending}
                onClick={onSubmit}
                className="w-full bg-red-500"
              >
                Submit
              </Button>
            </div>
            <div className="grid place-items-center mt-3">
              <DialogClose asChild>
                <Button type="button" variant="link">
                  Close
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
