import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { createServerClient } from '../lib/supabase'
import { Product } from '../types'

export default async function ProductsPage() {
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // In a real app, you'd fetch products from Supabase
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
        },
        {
          id: '4-large',
          size: 'large',
          price: 49.99,
          amazonLink: 'https://amazon.com/product-4-large',
          dimensions: '24x24 inches'
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
        },
        {
          id: '5-large',
          size: 'large',
          price: 62.99,
          amazonLink: 'https://amazon.com/product-5-large',
          dimensions: '24x36 inches'
        }
      ]
    },
    {
      id: '6',
      title: 'Tropical Beach Sunset',
      description: 'Vibrant sunset over a tropical beach with palm trees.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: 'Nature',
      tags: ['beach', 'sunset', 'tropical'],
      variants: [
        {
          id: '6-small',
          size: 'small',
          price: 24.99,
          amazonLink: 'https://amazon.com/product-6-small',
          dimensions: '12x16 inches'
        },
        {
          id: '6-medium',
          size: 'medium',
          price: 39.99,
          amazonLink: 'https://amazon.com/product-6-medium',
          dimensions: '18x24 inches'
        }
      ]
    }
  ];

  // Get all categories for the filter
  const categories = Array.from(new Set(mockProducts.map(product => product.category)))

  return (
    <main>
      <Header />
      
      {/* Page Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">All Wall Art</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our collection of beautiful wall art pieces for your home or office. 
            All products are available through our Amazon affiliate links.
          </p>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Filters */}
            <div className="md:col-span-3">
              <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="text-primary font-medium">All Products</button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button className="hover:text-primary transition-colors">{category}</button>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t my-6"></div>
                
                <h2 className="text-lg font-semibold mb-4">Price Range</h2>
                {/* In a real app, you'd implement price range filters here */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="price-all" type="radio" name="price" className="mr-2" defaultChecked />
                    <label htmlFor="price-all">All prices</label>
                  </div>
                  <div className="flex items-center">
                    <input id="price-under-30" type="radio" name="price" className="mr-2" />
                    <label htmlFor="price-under-30">Under $30</label>
                  </div>
                  <div className="flex items-center">
                    <input id="price-30-50" type="radio" name="price" className="mr-2" />
                    <label htmlFor="price-30-50">$30 - $50</label>
                  </div>
                  <div className="flex items-center">
                    <input id="price-over-50" type="radio" name="price" className="mr-2" />
                    <label htmlFor="price-over-50">Over $50</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="md:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 