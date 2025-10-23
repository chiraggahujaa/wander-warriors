# Supabase Setup Guide

This guide will help you set up Supabase for the Wander Warriors comment system.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Supabase CLI installed (optional, for migrations)

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Wander Warriors (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Add Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Run Database Migrations

You have two options to create the database schema:

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-ref
```

3. Push the migration:
```bash
supabase db push
```

### Option B: Manual SQL Execution

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/migrations/20250118000000_create_comments_table.sql`
4. Click "Run" to execute the SQL

## Step 5: Verify Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see a `comments` table with the following columns:
   - `id` (uuid, primary key)
   - `trek_slug` (text)
   - `name` (text)
   - `email` (text)
   - `comment` (text)
   - `ip_hash` (text, nullable)
   - `created_at` (timestamp with time zone)

## Step 6: Configure Row Level Security (RLS)

The migration automatically sets up RLS policies:
- **Public read access**: Anyone can view comments
- **Public insert access**: Anyone can submit comments (rate-limited in application)

You can verify/modify policies in **Authentication** → **Policies** section.

## Step 7: Test the Comment System

1. Start your development server:
```bash
npm run dev
```

2. Navigate to any trek page
3. Scroll to the comments section
4. Try submitting a test comment
5. The comment should appear immediately after submission

## Optional: Google reCAPTCHA v3 Setup

For enhanced spam protection, set up Google reCAPTCHA v3:

1. Go to [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Fill in the form:
   - **Label**: Wander Warriors
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domain(s) and `localhost` for testing
3. Accept the terms and click "Submit"
4. Copy your keys and add to `.env.local`:

```bash
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## Database Schema Details

### Comments Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier (auto-generated) |
| trek_slug | TEXT | NOT NULL | Trek identifier (e.g., "langtang-trek") |
| name | TEXT | NOT NULL, 1-50 chars | Commenter's name |
| email | TEXT | NOT NULL, valid format | Commenter's email (not displayed) |
| comment | TEXT | NOT NULL, 10-500 chars | Comment text |
| ip_hash | TEXT | NULLABLE | Hashed IP for rate limiting |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

### Indexes

- `idx_comments_trek_slug`: Fast lookup by trek
- `idx_comments_created_at`: Sorting by date (DESC)
- `idx_comments_ip_hash`: Rate limiting checks

## Security Features

The comment system includes multiple layers of spam prevention:

1. **Honeypot Field**: Hidden field that catches simple bots
2. **reCAPTCHA v3**: Score-based bot detection (if configured)
3. **Content Filtering**: Detects spam keywords and patterns
4. **Link Limits**: Maximum 2 links per comment
5. **Rate Limiting**: 1 comment per IP every 30 minutes
6. **Input Validation**: Length and format constraints
7. **SQL Injection Protection**: Supabase uses parameterized queries

## Troubleshooting

### Comments not appearing

1. Check browser console for errors
2. Verify API credentials in `.env.local`
3. Check Supabase logs: **Logs** → **API Logs**
4. Verify RLS policies are correctly set

### "Failed to submit comment" error

1. Check if the `comments` table exists
2. Verify RLS policies allow INSERT
3. Check if database is reachable (network issues)
4. Review API logs for specific error messages

### Rate limit issues during testing

1. Wait 30 minutes between submissions, or
2. Temporarily modify rate limit in `lib/supabase.ts` (change `30 * 60 * 1000` to lower value)
3. Use different browsers/IPs for testing

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Support

If you encounter issues:
1. Check the [Supabase Community](https://github.com/supabase/supabase/discussions)
2. Review the project's GitHub issues
3. Contact the development team

---

**Note**: Never commit your `.env.local` file to version control. It contains sensitive API keys!

