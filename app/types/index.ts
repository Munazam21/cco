// Removing ProductSize enum in favor of string for flexibility
// export type ProductSize = 'small' | 'medium' | 'large' | 'extra-large'

export interface ProductVariant {
  id: string
  size: string // Changed from ProductSize to string for custom sizes
  price: number
  amazonLink: string
  dimensions: string
}

export interface Product {
  id: string
  title: string
  description: string
  imageUrl: string
  featured: boolean
  createdAt: string
  updatedAt: string
  variants: ProductVariant[]
  category: string
  tags: string[]
} 