# Supabase-Shadcn Migration Toolkit

A modern full-stack starter with Supabase authentication, Shadcn UI, and database migrations.

## Features

- **Supabase Auth** - Email/password login and secure session management
- **Shadcn UI** - Accessible, customizable UI components 
- **SQL Migrations** - Direct Supabase migrations without ORM
- **Type Safety** - Full TypeScript support
- **Server Actions** - Secure backend functionality
- **Toast Notifications** - User feedback with Sonner

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
supabase-shadcn-migration-toolkit/
├── actions/                # Server actions
├── app/                    # Next.js app router
│   ├── api/                # API routes
│   ├── (auth)/             # Auth route group
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── dashboard/          # Dashboard page
│   └── page.tsx            # Homepage
├── components/             # UI components
├── lib/                    # Utility functions
├── supabase/               # Supabase config
│   ├── client.ts           # Browser client
│   ├── server.ts           # Server client
│   └── migrations/         # SQL migrations
├── types/                  # TypeScript types
└── middleware.ts           # Auth middleware
```

## Database Migrations

Run migrations with the Supabase CLI:

```bash
# Local development
supabase migration up

# Reset database (migrations + seed data)
supabase db reset

# Create new migration
supabase migration new migration_name

# Deploy to production
supabase db push
```

## Authentication

Authentication is handled through Supabase Auth with:
- Email/password login
- Protected routes via middleware
- Automatic profile creation

## Customization

- Theme: Edit colors in `globals.css`
- Components: Add new Shadcn UI components as needed
- Database: Add tables through migrations

## License

[MIT](LICENSE)