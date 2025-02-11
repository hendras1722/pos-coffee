import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const cookieStore = await cookies()

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: 'public' },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
  // createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  // cookies: {
  //   get(name: string) {
  //     return request.cookies.get(name)?.value
  //   },
  //   set(name: string, value: string, options: CookieOptions) {
  //     request.cookies.set({
  //       name,
  //       value,
  //       ...options,
  //     })
  //     response = NextResponse.next({
  //       request: {
  //         headers: request.headers,
  //       },
  //     })
  //     response.cookies.set({
  //       name,
  //       value,
  //       ...options,
  //     })
  //   },
  //   remove(name: string, options: CookieOptions) {
  //     request.cookies.set({
  //       name,
  //       value: '',
  //       ...options,
  //     })
  //     response = NextResponse.next({
  //       request: {
  //         headers: request.headers,
  //       },
  //     })
  //     response.cookies.set({
  //       name,
  //       value: '',
  //       ...options,
  //     })
  //   },
  // },
  //   }
  // )

  await supabase.auth.getUser()

  return response
}
