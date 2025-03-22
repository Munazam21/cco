# Wall Art Admin Troubleshooting Guide

If you're experiencing issues with the product form after logging in as admin, here are steps to diagnose and fix the problems:

## Common Issues

### 1. Supabase Tables Not Created

**Symptoms:**
- Error message: "Table 'products' does not exist"
- Form submission fails with 500 error

**Solution:**
1. Go to your Supabase dashboard
2. Open the SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql` from your project
4. Run the SQL query to create the necessary tables

### 2. Incorrect Environment Variables

**Symptoms:**
- Unable to connect to Supabase
- Authentication not working

**Solution:**
1. Check your `.env.local` file and ensure it has:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
2. Make sure these same values are also set in your Netlify environment variables
3. After updating, redeploy your application

### 3. Authentication Issues

**Symptoms:**
- Login works but redirects to login page again
- Middleware redirect loop

**Solution:**
1. Check browser console for cookie errors
2. Make sure your Supabase project has Email auth enabled
3. Verify the user exists in the Authentication → Users section of Supabase
4. Try clearing cookies and logging in again

### 4. RLS (Row Level Security) Policies

**Symptoms:**
- Login works but you can't insert records
- Permission denied errors

**Solution:**
1. Go to your Supabase dashboard
2. Navigate to Authentication → Policies
3. Make sure you have policies that allow authenticated users to insert into the products and product_variants tables
4. Add these policies if missing (see `supabase-schema.sql` for examples)

## Debugging Steps

1. **Check Console Logs:** Open your browser developer tools (F12) and look at the console for errors
2. **Inspect Network Requests:** In the Network tab, look for the POST request to `/api/products` and check its response
3. **Verify Database:** In Supabase, go to Table Editor and verify your tables exist with the correct columns
4. **Test Authentication:** Make sure your Supabase authentication is working by checking session in your browser storage

## Getting Extra Help

If you're still having issues:
1. Take screenshots of any error messages
2. Copy the debug information from the form's debug panel
3. Describe the exact steps you're taking when the error occurs 