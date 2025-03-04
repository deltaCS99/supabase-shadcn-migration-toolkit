# Database Migrations

This project uses Supabase for database management and includes a migration system for tracking schema changes over time.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Supabase project set up (local or remote)

## Migration Files

Migration files are stored in the `supabase/migrations` directory and are executed in order based on the timestamp prefix.

Current migrations:
- `20250304000000_initial_setup.sql` - Sets up profiles table and user triggers
- `20250304000001_create_projects_table.sql` - Creates projects table with RLS policies

## Seed Data

Initial data for development is stored in `supabase/seed.sql`.

## Running Migrations

### Local Development

1. Start your local Supabase stack:
   ```bash
   supabase start
   ```

2. Apply migrations:
   ```bash
   npm run migrate:local
   ```

3. Reset the database (apply migrations + seed):
   ```bash
   npm run migrate:reset
   ```

### Creating New Migrations

1. Create a new migration file:
   ```bash
   npm run migration:new your_migration_name
   ```

2. Edit the generated file in `supabase/migrations/` with your SQL statements

### Deploying to Production

1. Link to your remote Supabase project (first-time only):
   ```bash
   supabase link
   ```

2. Push migrations to remote database:
   ```bash
   npm run migrate:remote
   ```

## Database Schema

### Profiles Table

Automatically created for each user with these fields:
- `id` - UUID (references auth.users)
- `first_name` - Text
- `last_name` - Text
- `email` - Text
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Projects Table

Store user projects with these fields:
- `id` - UUID
- `name` - Text (required)
- `description` - Text
- `status` - Text (default: 'active')
- `user_id` - UUID (references auth.users)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Row Level Security (RLS)

Both tables have RLS enabled with policies that ensure users can only access their own data.

## Automatic Triggers

- Profile creation on user signup
- Sample projects creation for new users
- `updated_at` timestamp maintenance