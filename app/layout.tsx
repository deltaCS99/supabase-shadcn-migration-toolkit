import { Providers } from '@/providers/providers'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

export const metadata = {
  title: 'Supabase-Shadcn Migration Toolkit',
  description: 'A modern full-stack starter with Supabase, Shadcn UI and database migrations',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className={`min-h-screen bg-background antialiased ${inter.className}`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}