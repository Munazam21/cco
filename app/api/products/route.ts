import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '../../lib/supabase'
import { Product, ProductVariant, ProductSize } from '../../types'

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
    
    // Process variants
    const variants: Partial<ProductVariant>[] = [
      {
        size: 'small' as ProductSize,
        price: parseFloat(formData.get('variants[0].price') as string || '0'),
        dimensions: formData.get('variants[0].dimensions') as string,
        amazonLink: formData.get('variants[0].amazonLink') as string
      },
      {
        size: 'medium' as ProductSize,
        price: parseFloat(formData.get('variants[1].price') as string || '0'),
        dimensions: formData.get('variants[1].dimensions') as string,
        amazonLink: formData.get('variants[1].amazonLink') as string
      },
      {
        size: 'large' as ProductSize,
        price: parseFloat(formData.get('variants[2].price') as string || '0'),
        dimensions: formData.get('variants[2].dimensions') as string,
        amazonLink: formData.get('variants[2].amazonLink') as string
      }
    ].filter(v => v.price > 0 && v.amazonLink)
    
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