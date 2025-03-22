import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Ensure baseUrl is a valid URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
} 