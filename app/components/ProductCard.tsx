import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get the smallest price variant for display
  const lowestPrice = Math.min(...product.variants.map(variant => variant.price))

  return (
    <div className="card group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${lowestPrice.toFixed(2)}</span>
          <Link 
            href={`/products/${product.id}`}
            className="text-primary hover:underline"
          >
            View Options
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 