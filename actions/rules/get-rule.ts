import { createClient } from '@/services/supabase/server'
import { Rule } from './get-user-rules'
import { notFound } from 'next/navigation'

export async function getRule(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('rules')
    .select(`
      *,
      tech_stack:tech_stacks (
        name,
        version,
        category
      )
    `)
    .eq('id', id)
    .single()
  
  if (error || !data) {
    console.error('Error fetching rule:', error)
    notFound()
  }
  
  return data as Rule & { 
    tech_stack: { 
      name: string
      version: string
      category: string 
    } 
  }
}
