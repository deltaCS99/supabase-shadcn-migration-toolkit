import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">SupaShadcn-Migrator</span>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Supabase + Shadcn UI Starter Kit
              </h1>
              <p className="text-lg text-muted-foreground">
                A modern full-stack starter template with Supabase auth, Shadcn UI, and database migrations.
              </p>
              <div className="flex flex-row gap-4 pt-4">
                <Link href="/register">
                  <Button size="default">Get Started</Button>
                </Link>
                <Link href="https://github.com/yourusername/supabase-shadcn-migration-toolkit" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">View Code</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Supabase Auth</h3>
                <p className="text-muted-foreground text-sm">
                  Email/password and social login with Supabase authentication.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Shadcn UI</h3>
                <p className="text-muted-foreground text-sm">
                  Modern UI components for rapid development.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">Database Migrations</h3>
                <p className="text-muted-foreground text-sm">
                  Structured migrations for Supabase with Prisma integration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          A simple starter template for Next.js projects
        </div>
      </footer>
    </div>
  );
}