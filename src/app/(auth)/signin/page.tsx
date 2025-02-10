import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import Form from '@/components/auth/form'

export default async function SignInPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form />
          <Separator />
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link className="text-sm underline" href="/signup">
            Don&apos;t have an account? Sign up here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
