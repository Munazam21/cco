import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { createServerClient } from '../lib/supabase'

export default async function AdminPage() {
  // Create a Supabase client for server component
  const supabase = createServerClient()

  return (
    <main>
      <Header />
      
      {/* Admin Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Admin Dashboard</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your wall art products and affiliate links
          </p>
        </div>
      </section>
      
      {/* Admin Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form action="/api/products" method="POST" className="space-y-6">
              {/* Basic Product Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium">
                      Product Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block mb-2 font-medium">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block mb-2 font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="imageUrl" className="block mb-2 font-medium">
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block mb-2 font-medium">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              
              {/* Product Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
                
                {/* Small Size */}
                <div className="border p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-3">Small Size</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="small-price" className="block mb-2 text-sm">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="small-price"
                        name="variants[0].price"
                        min="0.01"
                        step="0.01"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="small-dimensions" className="block mb-2 text-sm">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        id="small-dimensions"
                        name="variants[0].dimensions"
                        placeholder="e.g. 12x16 inches"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="small-link" className="block mb-2 text-sm">
                        Amazon Link
                      </label>
                      <input
                        type="url"
                        id="small-link"
                        name="variants[0].amazonLink"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Medium Size */}
                <div className="border p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-3">Medium Size</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="medium-price" className="block mb-2 text-sm">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="medium-price"
                        name="variants[1].price"
                        min="0.01"
                        step="0.01"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="medium-dimensions" className="block mb-2 text-sm">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        id="medium-dimensions"
                        name="variants[1].dimensions"
                        placeholder="e.g. 18x24 inches"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="medium-link" className="block mb-2 text-sm">
                        Amazon Link
                      </label>
                      <input
                        type="url"
                        id="medium-link"
                        name="variants[1].amazonLink"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Large Size */}
                <div className="border p-4 rounded-md">
                  <h4 className="font-medium mb-3">Large Size</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="large-price" className="block mb-2 text-sm">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="large-price"
                        name="variants[2].price"
                        min="0.01"
                        step="0.01"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="large-dimensions" className="block mb-2 text-sm">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        id="large-dimensions"
                        name="variants[2].dimensions"
                        placeholder="e.g. 24x36 inches"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="large-link" className="block mb-2 text-sm">
                        Amazon Link
                      </label>
                      <input
                        type="url"
                        id="large-link"
                        name="variants[2].amazonLink"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 