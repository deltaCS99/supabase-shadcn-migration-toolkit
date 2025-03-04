// components/providers/providers.tsx
'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}