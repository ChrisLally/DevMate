'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'

export function TechStackFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (term) {
        params.set('search', term)
      } else {
        params.delete('search')
      }
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="w-full max-w-sm relative">
      <Input
        type="text"
        placeholder="Search tech stacks..."
        defaultValue={searchParams.get('search')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full"
        aria-label="Search tech stacks"
      />
      {isPending && (
        <div className="absolute right-3 top-2.5">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
