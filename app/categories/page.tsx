import React from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { createServerClient } from '../lib/supabase'
import { Product } from '../types'

export default async function CategoriesPage() {
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // In a real app, you'd fetch this data from Supabase
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
        }
      ]
    },
    {
      id: '4',
      title: 'Minimalist Geometric Shapes',
      description: 'Modern minimalist wall art featuring geometric shapes and patterns.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Geometric',
      tags: ['geometric', 'minimalist', 'modern'],
      variants: [
        {
          id: '4-small',
          size: 'small',
          price: 27.99,
          amazonLink: 'https://amazon.com/product-4-small',
          dimensions: '12x12 inches'
        }
      ]
    },
    {
      id: '5',
      title: 'Black and White City Skyline',
      description: 'Elegant black and white print of a city skyline, perfect for modern interiors.',
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Urban',
      tags: ['city', 'skyline', 'black and white'],
      variants: [
        {
          id: '5-medium',
          size: 'medium',
          price: 42.99,
          amazonLink: 'https://amazon.com/product-5-medium',
          dimensions: '18x24 inches'
        }
      ]
    }
  ];

  // Get unique categories
  const categories = Array.from(new Set(mockProducts.map(product => product.category)))
  
  // Group products by category
  const productsByCategory = categories.map(category => {
    const products = mockProducts.filter(product => product.category === category)
    return {
      category,
      products,
      count: products.length,
      image: products[0]?.imageUrl // Use the first product's image as the category image
    }
  })

  return (
    <main>
      <Header />
      
      {/* Page Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Wall Art Categories</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our curated collection of wall art by category
          </p>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productsByCategory.map(({ category, count, image }) => (
              <Link 
                key={category}
                href={`/products?category=${category}`}
                className="card group overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-1">{category}</h2>
                    <p>{count} {count === 1 ? 'Product' : 'Products'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Tags Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Tags</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {/* Extract all tags and get unique ones */}
            {Array.from(new Set(mockProducts.flatMap(p => p.tags))).map(tag => (
              <Link 
                key={tag}
                href={`/products?tag=${tag}`}
                className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 