import React from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductCard from './components/ProductCard'
import { createServerClient } from './lib/supabase'
import { Product } from './types'

// This is a server component
export default async function Home() {
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // In a real app, you'd fetch featured products from Supabase
  // For now, we'll use placeholder data
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Mountain Sunset Canvas',
      description: 'Beautiful mountain landscape at sunset on high-quality canvas.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Nature',
      tags: ['mountains', 'sunset', 'canvas'],
      variants: [
        {
          id: '1-small',
          size: 'small',
          price: 24.99,
          amazonLink: 'https://amazon.com/product-1-small',
          dimensions: '12x16 inches'
        },
        {
          id: '1-medium',
          size: 'medium',
          price: 39.99,
          amazonLink: 'https://amazon.com/product-1-medium',
          dimensions: '18x24 inches'
        },
        {
          id: '1-large',
          size: 'large',
          price: 59.99,
          amazonLink: 'https://amazon.com/product-1-large',
          dimensions: '24x36 inches'
        }
      ]
    },
    {
      id: '2',
      title: 'Abstract Blue Waves',
      description: 'Modern abstract painting featuring calming blue waves.',
      imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Abstract',
      tags: ['abstract', 'blue', 'waves'],
      variants: [
        {
          id: '2-small',
          size: 'small',
          price: 29.99,
          amazonLink: 'https://amazon.com/product-2-small',
          dimensions: '12x12 inches'
        },
        {
          id: '2-medium',
          size: 'medium',
          price: 44.99,
          amazonLink: 'https://amazon.com/product-2-medium',
          dimensions: '18x18 inches'
        }
      ]
    },
    {
      id: '3',
      title: 'Botanical Print Set',
      description: 'Set of 4 botanical prints, perfect for any room.',
      imageUrl: 'https://images.unsplash.com/photo-1602928298849-325cec8771c3',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Botanical',
      tags: ['botanical', 'plants', 'set'],
      variants: [
        {
          id: '3-small',
          size: 'small',
          price: 34.99,
          amazonLink: 'https://amazon.com/product-3-small',
          dimensions: '8x10 inches (set of 4)'
        },
        {
          id: '3-medium',
          size: 'medium',
          price: 54.99,
          amazonLink: 'https://amazon.com/product-3-medium',
          dimensions: '11x14 inches (set of 4)'
        }
      ]
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Beautiful Wall Art for Your Home</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover stunning canvas prints and wall decorations at great prices
          </p>
          <Link href="/products" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Browse All Art
          </Link>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Wall Art</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All our art pieces are crafted with high-quality materials designed to last
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Great Value</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Competitive prices through our Amazon affiliate partners
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Order through Amazon for reliable and fast shipping options
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 