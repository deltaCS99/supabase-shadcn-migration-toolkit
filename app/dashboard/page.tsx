'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/supabase/client'
import { LogOut, Plus, User, Settings, Loader2 } from 'lucide-react'
import { getProjects } from '@/actions/projects'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/types/project'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const { projects, error } = await getProjects()
        
        if (error) {
          toast.error("Error", {
            description: `Failed to load projects: ${error}`,
          })
          return
        }
        
        setProjects(projects)
      } catch (error) {
        toast.error("Error", {
          description: "Failed to load projects",
        })
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Logged Out", {
        description: "You have been successfully logged out",
      })
      router.push('/')
    } catch (error) {
      toast.error("Error", {
        description: "Failed to sign out. Please try again.",
      })
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30'
      case 'planning':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30'
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/30'
      case 'completed':
        return 'bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 hover:bg-gray-500/30'
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/dashboard">
              <span className="text-primary">SupaShadcn-Migrator</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects && projects.length > 0 ? (
                projects.map(project => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(project.status)}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        Created {new Date(project.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description || 'No description provided'}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-center">No projects yet</CardTitle>
                    <CardDescription className="text-center">
                      Create your first project to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Create Project</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          Supabase-Shadcn Migration Toolkit © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}