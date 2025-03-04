// components/providers/index.tsx
'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider } from '@/providers/theme-provider'

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}