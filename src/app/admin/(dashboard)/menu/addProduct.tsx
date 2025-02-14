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
import { triggerButton } from './TriggerButton'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStoreMenu } from '@/store/menu'
import ArrayMap from '@/components/ArrayMap'
import { useRef } from 'react'
import { Menu } from '@/actions/getMenu/actions'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(), // Atau z.string().min(1, { message: "Description is required" }) jika wajib diisi
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  top_seller: z.enum(['yes', 'no']), // Atau z.boolean() jika 'yes'/'no' diubah menjadi true/false
  img: z.string().url({ message: 'Invalid URL' }).optional(),
  category: z.string().min(1, { message: 'Category is required' }),
})
export default function AddProduct() {
  const storeMenu = useStoreMenu()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      top_seller: 'no',
      img: '',
      category: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    storeMenu.menuAction({
      created_at: new Date(),
      name: 'Laptop Pro X1',
      description: 'Powerful and lightweight laptop for professionals.',
      price: 1299.99,
      top_seller: 'yes',
      img: 'https://example.com/laptop-pro-x1.jpg',
      id: 'laptop-pro-x1-001',
      category: 'Electronics',
    })
  }
  const formName = useRef([
    { key: 'name', name: 'name' },
    { key: 'description', name: 'description' },
    { key: 'price', name: 'price' },
    { key: 'top_seller', name: 'top seller' },
    { key: 'img', name: 'image' },
    { key: 'category', name: 'category' },
  ])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={triggerButton}>
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <DialogTitle></DialogTitle>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-auto h-[400px] px-2"
          >
            <ArrayMap
              of={formName.current}
              render={(item, index) => (
                <FormField
                  key={item?.key}
                  control={form.control}
                  name={item.key as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{item?.name}</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
