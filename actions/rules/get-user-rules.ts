import { createClient } from '@/services/supabase/server'

export type Rule = {
  id: string
  name: string
  description: string | null
  tech_stack_id: string
  category: string
  rule_content: string
  tags: string[]
  parameters: Record<string, unknown>
  created_at: string
}

export async function getUserRules() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('rules')
    .select(`
      *,
      tech_stack:tech_stacks (
        name,
        version
      )
    `)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching rules:', error)
    throw new Error('Failed to fetch rules')
  }
  
  return data as (Rule & { tech_stack: { name: string, version: string } })[]
}
