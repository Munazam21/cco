'use client'

import React, { useState, useEffect } from 'react'

interface Variant {
  id: number;
  size: string;
  price: string;
  dimensions: string;
  amazonLink: string;
}

const DynamicProductForm = () => {
  const [variants, setVariants] = useState<Variant[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  // Add a variant when the component mounts
  useEffect(() => {
    addVariant()
  }, [])

  const addVariant = () => {
    const newVariant: Variant = {
      id: Date.now(), // Use timestamp as unique ID
      size: '',
      price: '',
      dimensions: '',
      amazonLink: ''
    }
    setVariants([...variants, newVariant])
  }

  const removeVariant = (id: number) => {
    const updatedVariants = variants.filter(variant => variant.id !== id)
    setVariants(updatedVariants.length > 0 ? updatedVariants : [])
  }

  const handleInputChange = (id: number, field: keyof Variant, value: string) => {
    setVariants(
      variants.map(variant => 
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    )
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormMessage(null)
    
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      // Add the variant count
      formData.set('variantCount', variants.length.toString())
      
      // Log submission
      console.log('Submitting product with variants:', variants.length)
      
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit product')
      }
      
      // Success
      setFormMessage({
        type: 'success',
        text: 'Product added successfully!'
      })
      
      // Reset form
      form.reset()
      setVariants([{
        id: Date.now(),
        size: '',
        price: '',
        dimensions: '',
        amazonLink: ''
      }])
      
    } catch (error: any) {
      console.error('Error submitting product:', error)
      setFormMessage({
        type: 'error',
        text: error.message || 'An error occurred while submitting the product'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formMessage && (
        <div className={`${
          formMessage.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
          'bg-red-100 border-red-400 text-red-700'
        } px-4 py-3 rounded mb-4 border`}>
          {formMessage.text}
        </div>
      )}
    
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
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
              disabled={submitting}
            />
          </div>
        </div>
      </div>
      
      {/* Product Variants - Dynamic */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Product Sizes and Links</h3>
          <button
            type="button"
            onClick={addVariant}
            className="bg-secondary text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors text-sm"
            disabled={submitting}
          >
            + Add Size
          </button>
        </div>
        
        {/* Hidden input for variant count */}
        <input 
          type="hidden" 
          name="variantCount" 
          value={variants.length} 
        />
        
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={variant.id} className="variant-item border p-4 rounded-md">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium">Size Option {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeVariant(variant.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  disabled={variants.length === 1 || submitting}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm">
                    Size Name
                  </label>
                  <input
                    type="text"
                    name={`variants[${index}].size`}
                    value={variant.size}
                    onChange={(e) => handleInputChange(variant.id, 'size', e.target.value)}
                    placeholder="e.g. Small, 10x12, etc."
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name={`variants[${index}].price`}
                    value={variant.price}
                    onChange={(e) => handleInputChange(variant.id, 'price', e.target.value)}
                    min="0.01"
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name={`variants[${index}].dimensions`}
                    value={variant.dimensions}
                    onChange={(e) => handleInputChange(variant.id, 'dimensions', e.target.value)}
                    placeholder="e.g. 12x16 inches"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">
                    Amazon Link
                  </label>
                  <input
                    type="url"
                    name={`variants[${index}].amazonLink`}
                    value={variant.amazonLink}
                    onChange={(e) => handleInputChange(variant.id, 'amazonLink', e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          className="btn-primary w-full md:w-auto"
          disabled={submitting}
        >
          {submitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>
    </form>
  )
}

export default DynamicProductForm 