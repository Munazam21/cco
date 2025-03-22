import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { createServerClient } from '../../lib/supabase'

export const metadata = {
  title: 'Product Management - Admin Dashboard',
  description: 'Manage your wall art products'
}

export default async function ProductManagementPage() {
  // Create a Supabase client for server component
  const supabase = createServerClient()
  
  // Check if user is authenticated
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  
  // If no session or error, redirect to login
  if (sessionError || !sessionData.session) {
    console.log('No valid session detected, redirecting to login')
    redirect('/login')
  }

  // Fetch products from Supabase
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (*)
    `)
    .order('created_at', { ascending: false })
  
  if (productsError) {
    console.error('Error fetching products:', productsError)
  }

  return (
    <main>
      <Header />
      
      {/* Admin Header */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Product Management</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View and manage your wall art products
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <Link href="/admin" className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-colors">
              Add New Product
            </Link>
            <Link href="/admin/products" className="px-4 py-2 bg-secondary text-white rounded hover:bg-green-600 transition-colors">
              Manage Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Products List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Your Products</h2>
            
            {productsError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Error loading products: {productsError.message}
              </div>
            )}
            
            {products && products.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found. Add your first product!</p>
                <Link href="/admin" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-blue-600 transition-colors">
                  Add Product
                </Link>
              </div>
            )}
            
            {products && products.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Variants</th>
                      <th className="py-3 px-4 text-left">Created</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={product.image_url} 
                              alt={product.title} 
                              className="w-12 h-12 object-cover rounded mr-3"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.jpg'; // Fallback image
                              }}
                            />
                            <div>
                              <p className="font-medium truncate max-w-xs">{product.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">{product.product_variants?.length || 0}</td>
                        <td className="py-3 px-4">{new Date(product.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/products/${product.id}`} 
                              className="text-primary hover:underline"
                              target="_blank"
                            >
                              View
                            </Link>
                            {/* Edit and delete functionality would be added here */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 