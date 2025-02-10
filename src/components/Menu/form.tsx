'use client'
import { useActionState } from 'react'
import { Input } from '@/components/ui/input'

export default function Form() {
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
    <div>
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
    </div>
  )
}
