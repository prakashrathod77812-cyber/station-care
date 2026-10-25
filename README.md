# Station Care

Station Care lets verified users submit family reports, volunteer applications, and NGO applications. Administrators can view aggregate counts in a protected dashboard.

## Security model

- Supabase Auth manages account creation, email confirmation, sign-in, and session renewal.
- The Next.js proxy refreshes cookie-backed sessions. Server code verifies claims before using them.
- Forms use Server Actions with server-side validation; sensitive submissions are not written to browser storage.
- Supabase Row Level Security (RLS) allows users to create and read only their own submissions. Only `admin` profiles may read or manage all records.
- The Supabase publishable key is safe to expose in the browser. Never add a `service_role` key to `NEXT_PUBLIC_*` variables or client-side code.

## Set up Supabase

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/migrations/20261023000000_auth_and_data.sql`](supabase/migrations/20261023000000_auth_and_data.sql).
3. Copy `.env.example` to `.env.local`, then set the project URL and **publishable** key from Supabase’s Connect dialog.
4. In Supabase Auth settings, enable email confirmation and add your local and production URLs to the redirect allow-list, including `http://localhost:3000/auth/confirm` during local development.
5. Create the first account through `/sign-up`. Then promote it in the SQL Editor:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = '<auth-user-uuid>';
   ```

Use the Auth Users view to copy the account UUID. Admin assignment intentionally requires this privileged database action so that ordinary users cannot grant themselves access.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Before testing submissions, configure `.env.local` and run the migration.

## Deployment checklist

- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the deployment environment.
- Add the deployment URL’s `/auth/confirm` callback to Supabase Auth redirect URLs.
- Keep RLS enabled on every application table.
- Do not store personal reports or access tokens in `localStorage`.
