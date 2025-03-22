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
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : []
    
    // Create product object
    const newProduct = {
      title,
      description,
      image_url: imageUrl,
      category,
      tags,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    // Insert product into Supabase
    const { data: product, error } = await supabase
      .from('products')
      .insert(newProduct)
      .select()
      .single()
    
    if (error) {
      console.error('Error inserting product:', error)
      throw new Error(`Error inserting product: ${error.message}`)
    }
    
    // Get the number of variants from the form data
    const variantCount = parseInt(formData.get('variantCount') as string || '0')
    const variantsToInsert = []
    
    // Process dynamic variants
    for (let i = 0; i < variantCount; i++) {
      const size = formData.get(`variants[${i}].size`) as string
      const price = parseFloat(formData.get(`variants[${i}].price`) as string || '0')
      const dimensions = formData.get(`variants[${i}].dimensions`) as string
      const amazonLink = formData.get(`variants[${i}].amazonLink`) as string
      
      if (size && price > 0 && amazonLink) {
        variantsToInsert.push({
          product_id: product.id,
          size,
          price,
          dimensions,
          amazon_link: amazonLink
        })
      }
    }
    
    // Insert variants into Supabase
    if (variantsToInsert.length > 0) {
      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert)
      
      if (variantsError) {
        console.error('Error inserting variants:', variantsError)
        throw new Error(`Error inserting variants: ${variantsError.message}`)
      }
    }
    
    return NextResponse.json(
      { 
        message: 'Product added successfully',
        product: { ...newProduct, id: product.id, variants: variantsToInsert }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error handling product submission:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add product' },
      { status: 500 }
    )
  }
} 