import Body from '@/components/layouts/Body'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Web',
}

export default function RootLayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Body>
        <div>{children}</div>
      </Body>
    </html>
  )
}
