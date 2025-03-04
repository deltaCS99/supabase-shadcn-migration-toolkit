'use server'

import { createClient } from '@/supabase/server'
import { Project } from '@/types/project'

export async function getProjects(): Promise<{ projects: Project[] | null; error: string | null }> {
  try {
    // Create a client with the user's session from cookies
    const supabase = await createClient()
    
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { projects: null, error: 'User not authenticated' }
    }
    
    // Fetch the projects for this user
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id) // Ensure we only get projects for this user
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return { projects: null, error: error.message }
    }
    
    return { projects: data as Project[], error: null }
  } catch (err) {
    console.error('Failed to fetch projects:', err)
    return { 
      projects: null, 
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    }
  }
}