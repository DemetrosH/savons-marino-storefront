"use client";

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/woocommerce'
import { useCartStore } from '@/store/useCartStore'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addItem)
  
  // Use first image if available, else a placeholder
  const imageUrl = product.images?.[0]?.src || 'https://placehold.co/400x400?text=Savons+Marino';
  const price = product.prices?.price ? (parseInt(product.prices.price) / 100).toFixed(2) : '0.00';

  return (
    <div className="group flex flex-col bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link href={`/produit/${product.slug}`} className="block w-full h-full">
          <img 
            src={imageUrl} 
            alt={product.images?.[0]?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        {product.tags && product.tags.some(t => t.name.toLowerCase() === 'exfoliant') && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-zinc-900/90 text-zinc-100 text-[10px] md:text-xs uppercase font-bold tracking-wider px-3 py-1 rounded shadow-sm backdrop-blur-sm border border-zinc-800/50">
              Exfoliant
            </span>
          </div>
        )}
        
        {/* Overlay Add to Cart Button (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
          <button 
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/produit/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 
            className="font-playfair font-semibold text-lg text-foreground line-clamp-1 mb-1"
            dangerouslySetInnerHTML={{ __html: product.name }}
          />
        </Link>
        {product.categories?.[0] && (
          <p className="text-sm text-muted-foreground mb-3">
            {product.categories[0].name}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-lg text-foreground">
            {price} $
          </span>
          {/* Mobile Add to Cart */}
          <button 
            onClick={() => addToCart(product)}
            className="md:hidden w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
