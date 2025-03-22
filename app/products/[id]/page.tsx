import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { createServerClient } from '../../lib/supabase'
import { Product, ProductVariant } from '../../types'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // In a real app, you'd fetch product from Supabase
  // For now, we'll use placeholder data
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Mountain Sunset Canvas',
      description: 'Beautiful mountain landscape at sunset on high-quality canvas. This stunning piece features vibrant colors of the sun setting behind mountain peaks, creating a peaceful and serene atmosphere for any room. The high-quality canvas ensures the colors remain vivid for years to come.',
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
      description: 'Modern abstract painting featuring calming blue waves. This contemporary piece adds a touch of sophistication to any space with its soothing blue tones and dynamic wave patterns. Perfect for modern interiors or as a statement piece in a minimalist setting.',
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
      description: 'Set of 4 botanical prints, perfect for any room. This elegant collection features detailed illustrations of classic botanical specimens, printed on premium paper. The neutral color palette makes it easy to integrate into various interior styles, from traditional to contemporary.',
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

  // Find the product with the matching ID
  const product = mockProducts.find(p => p.id === id)
  
  // If no product is found, return a 404 page
  if (!product) {
    notFound()
  }

  return (
    <main>
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Available Sizes</h2>
              <div className="space-y-4">
                {product.variants.map((variant: ProductVariant) => (
                  <div key={variant.id} className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium capitalize">{variant.size}</h3>
                      <p className="text-sm text-gray-500">{variant.dimensions}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold">${variant.price.toFixed(2)}</span>
                      <a 
                        href={variant.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-block"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Product Details</h2>
              <ul className="space-y-2">
                <li><span className="font-medium">Category:</span> {product.category}</li>
                <li>
                  <span className="font-medium">Tags:</span>{' '}
                  {product.tags.map((tag, index) => (
                    <span key={tag}>
                      {tag}{index < product.tags.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Back to products link */}
        <div className="mt-12">
          <Link href="/products" className="text-primary hover:underline flex items-center">
            ← Back to all products
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 