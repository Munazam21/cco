import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '../../lib/supabase'
import { Product, ProductVariant } from '../../types'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const supabase = createServerClient()
    
    // Extract basic product information
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const imageUrl = formData.get('imageUrl') as string
    const tagsString = formData.get('tags') as string
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
    
    // Create product object
    const newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'variants'> = {
      title,
      description,
      imageUrl,
      category,
      tags,
      featured: false
    }
    
    // In a real app, we'd store this in Supabase
    // const { data: product, error } = await supabase
    //   .from('products')
    //   .insert(newProduct)
    //   .select()
    //   .single()
    
    // if (error) {
    //   throw new Error(`Error inserting product: ${error.message}`)
    // }
    
    // Get the number of variants from the form data
    const variantCount = parseInt(formData.get('variantCount') as string || '0')
    const variants: Partial<ProductVariant>[] = []
    
    // Process dynamic variants
    for (let i = 0; i < variantCount; i++) {
      const size = formData.get(`variants[${i}].size`) as string
      const price = parseFloat(formData.get(`variants[${i}].price`) as string || '0')
      const dimensions = formData.get(`variants[${i}].dimensions`) as string
      const amazonLink = formData.get(`variants[${i}].amazonLink`) as string
      
      if (size && price > 0 && amazonLink) {
        variants.push({
          size,
          price,
          dimensions,
          amazonLink
        })
      }
    }
    
    // In a real app, we'd store these in Supabase as well
    // For each valid variant:
    // const variantInserts = variants.map(variant => {
    //   return supabase.from('product_variants').insert({
    //     ...variant,
    //     product_id: product.id
    //   })
    // })
    
    // await Promise.all(variantInserts)
    
    return NextResponse.json(
      { 
        message: 'Product added successfully',
        product: { ...newProduct, variants }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error handling product submission:', error)
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
} 