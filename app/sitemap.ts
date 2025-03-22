import { MetadataRoute } from 'next'
import { createServerClient } from './lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure baseUrl is a valid URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  // In production, you would fetch this from Supabase
  const supabase = createServerClient()
  
  // Placeholder/mock product IDs
  const productIds = ['1', '2', '3', '4', '5', '6']
  
  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ] as MetadataRoute.Sitemap
  
  // Product detail pages
  const productRoutes = productIds.map(id => ({
    url: `${baseUrl}/products/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) as MetadataRoute.Sitemap
  
  return [...routes, ...productRoutes]
} 