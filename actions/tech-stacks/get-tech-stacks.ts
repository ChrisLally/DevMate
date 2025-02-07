import { createClient } from '@/services/supabase/server'

export type TechStack = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export async function getTechStacks(search?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('tech_stacks')
    .select('*')
    .order('name')
  
  if (search) {
    query = query.ilike('name', `%${search}%`)
  }
  
  const { data, error } = await query
  
  if (error) {
    throw new Error('Failed to fetch tech stacks')
  }
  
  return data as TechStack[]
}
