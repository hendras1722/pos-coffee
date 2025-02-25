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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ArrayMap from '@/components/ArrayMap'
import { useEffect, useRef, useState, useTransition } from 'react'
import { createClient } from '@/utils/supabase/client'
import NumberInput from '@/components/InputCurrency'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MAX_FILE_SIZE = 1000000 // 1MB
const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
]

function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime() //Timestamp
  let d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0 //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0
      d = Math.floor(d / 16)
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(), // Atau z.string().min(1, { message: "Description is required" }) jika wajib diisi
  price: z.string(),
  top_seller: z.enum(['yes', 'no']), // Atau z.boolean() jika 'yes'/'no' diubah menjadi true/false
  img: z
    .any()
    .refine((file) => {
      if (!file) return true
      if (file.size > MAX_FILE_SIZE) return false
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false
      return true
    })
    .optional(),
  category: z.string().min(1, { message: 'Category is requireds' }).optional(),
})
export default function AddProduct({
  getData,
}: Readonly<{
  getData: () => void
}>) {
  const nameFile = useRef('')
  const [category, setCategory] = useState<any[]>([])
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function getCategory() {
    const supabase = createClient()
    let { data: category, error } = await supabase.from('category').select('*')
    if (error) return console.error(error)
    console.log(category)
    setCategory(category ?? [])
  }
  useEffect(() => {
    const getCategoryAsync = async () => {
      await getCategory()
    }
    getCategoryAsync()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '0',
      top_seller: 'no',
      img: undefined,
      category: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const supabase = createClient()
      const { data, error: errorUploads } = await supabase.storage
        .from('pos')
        .upload('uploads/' + (generateUUID() || ''), values.img, {
          cacheControl: '3600',
          upsert: false,
        })

      if (errorUploads) return console.error('errorUploads', errorUploads)

      let newObj = {
        ...values,
        img: data?.fullPath + '/' + data?.id,
        top_seller: values.top_seller === 'yes',
        price: values.price.split('.').join(''),
        id_category: values.category,
        category: undefined,
      }

      const { data: insertMenu, error } = await supabase
        .from('menu')
        .insert(newObj)
        .select()
      if (error) {
        const { data } = await supabase.storage
          .from('pos')
          .remove(['uploads/' + (nameFile.current || '').replace(' ', '-')])
        return
      }
      if (insertMenu && insertMenu?.length > 0) {
        getData()
      }
      setIsModalOpen(false)
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
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={triggerButton}>
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="mb-16">
          <Form {...form}>
            <DialogTitle></DialogTitle>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 overflow-auto h-[400px] px-2 my-5 pb-5"
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
                        <FormLabel className="capitalize">
                          {item?.name}
                        </FormLabel>
                        <FormControl>
                          {(item?.key === 'img' && (
                            <Input
                              type="file"
                              onChange={(e) => {
                                nameFile.current = String(
                                  e.target.files?.[0].name
                                )
                                field.onChange(e.target.files?.[0])
                              }}
                            />
                          )) ||
                            (item?.key === 'price' && (
                              <NumberInput
                                value={field.value ?? ''}
                                onChange={(e: string) => {
                                  field.onChange(e)
                                }}
                                placeholder="Enter amount"
                                leading={<span>Rp</span>}
                              />
                            )) ||
                            (item?.key === 'category' && (
                              <Select
                                onValueChange={(value: string) => {
                                  field.onChange(value)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <ArrayMap
                                      of={category}
                                      render={(item, index) => (
                                        <SelectItem
                                          key={index}
                                          value={item?.id}
                                        >
                                          {item?.name}
                                        </SelectItem>
                                      )}
                                    />
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )) ||
                            (item?.key === 'top_seller' && (
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Top Seller" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <ArrayMap
                                      of={['yes', 'no']}
                                      render={(item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      )}
                                    />
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )) || <Input placeholder={item?.name} {...field} />}
                          {/* <Input placeholder="shadcn" {...field} /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="block">
          <div className="block w-full">
            <div>
              <Button
                disabled={isPending}
                className="w-full"
                onClick={() => formRef.current?.requestSubmit()}
              >
                Submit
              </Button>
            </div>
            <div className="grid place-items-center mt-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => form?.reset()}
                >
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
