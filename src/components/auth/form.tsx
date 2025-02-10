'use client'

import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signin } from '@/actions/auth/actions'
import { useActionState } from 'react'

export default function Form() {
  const [error, submitAction, isPending] = useActionState(
    (prevState, formData) => {
      console.log(formData.get('email'))
    },
    null
  )
  return (
    <form className="space-y-6" action={submitAction}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="m@example.com"
          required
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" required type="password" />
      </div>
      <Button
        type="submit"
        formAction={signin}
        className="w-full"
        disabled={isPending}
      >
        Sign in
      </Button>
    </form>
  )
}
