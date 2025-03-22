import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wall Art Affiliate Store',
  description: 'Discover and purchase beautiful wall art through our affiliate links. Find canvas prints, posters, and wall decorations for your home or office.',
  keywords: 'wall art, canvas prints, wall decor, home decoration, amazon affiliate, art prints',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Wall Art Affiliate Store',
    description: 'Discover and purchase beautiful wall art through our affiliate links',
    url: '/',
    siteName: 'Wall Art Affiliate Store',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wall Art Affiliate Store',
    description: 'Discover and purchase beautiful wall art through our affiliate links',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 