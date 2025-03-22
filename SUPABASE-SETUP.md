# Supabase Setup Guide for Wall Art Affiliate

This guide will help you set up Supabase for your Wall Art Affiliate website and implement the product management functionality.

## 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key (you'll need these for your `.env.local` file)

## 2. Set Up Database Tables

You have two options:

### Option A: Using the SQL Editor

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql` into the editor
3. Run the SQL queries to create the tables and policies

### Option B: Using the Table Editor

1. Go to Table Editor in your Supabase dashboard
2. Create the `products` table with these columns:
   - `id` (type: uuid, primary key, default: uuid_generate_v4())
   - `title` (type: text)
   - `description` (type: text)
   - `image_url` (type: text)
   - `category` (type: text)
   - `tags` (type: text[])
   - `featured` (type: boolean, default: false)
   - `created_at` (type: timestamptz, default: now())
   - `updated_at` (type: timestamptz, default: now())

3. Create the `product_variants` table with these columns:
   - `id` (type: uuid, primary key, default: uuid_generate_v4())
   - `product_id` (type: uuid, foreign key to products.id)
   - `size` (type: text)
   - `price` (type: decimal)
   - `dimensions` (type: text)
   - `amazon_link` (type: text)
   - `created_at` (type: timestamptz, default: now())

4. Add a foreign key relationship from `product_variants.product_id` to `products.id` with CASCADE delete

## 3. Enable Row Level Security (RLS)

1. In the Auth section of your Supabase dashboard, set up Email authentication
2. Create at least one admin user with email and password
3. In the Table Editor, enable RLS for both tables
4. Create the following policies:

For `products` table:
- Allow SELECT for everyone 
- Allow INSERT, UPDATE, DELETE for authenticated users

For `product_variants` table:
- Allow SELECT for everyone
- Allow INSERT, UPDATE, DELETE for authenticated users

## 4. Update Environment Variables

Update your `.env.local` file with the Supabase credentials:

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 5. Deploy to Netlify or Vercel

1. Push your code to GitHub
2. Connect your repository to Netlify or Vercel
3. In your deployment platform, add the environment variables from your `.env.local` file

## 6. Usage Instructions

### Adding Products

1. Log in to your admin panel at `/login`
2. Navigate to the admin dashboard at `/admin`
3. Fill out the product form with:
   - Title, Description, Category, and Image URL
   - Add as many size variants as needed
   - For each variant, specify Size, Price, Dimensions, and Amazon affiliate link
4. Submit the form to add the product to your database

### Managing Products (Future Enhancement)

For product management functionality (edit/delete), you'll need to implement:
1. A product listing page in the admin area
2. Edit forms for existing products
3. Delete functionality for products

## 7. Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify your Supabase credentials are correct
3. Ensure RLS policies are properly set up
4. Test your API routes with Postman or similar tools 