"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-12 text-center text-foreground">
          Votre Panier
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-lg border border-border shadow-sm">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-playfair font-semibold mb-4">Votre panier est vide</h2>
            <p className="text-muted-foreground mb-8">Découvrez nos savons artisanaux et trouvez votre coup de cœur.</p>
            <Link 
              href="/boutique" 
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Retour à la boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {items.map((item) => {
                const price = item.prices?.price ? parseInt(item.prices.price) / 100 : 0;
                
                return (
                  <div key={item.cartItemId || item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-border">
                    <Link href={`/produit/${item.slug}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                      <img 
                        src={item.images?.[0]?.src || 'https://placehold.co/400x400?text=Savons+Marino'} 
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <Link href={`/produit/${item.slug}`} className="hover:text-primary transition-colors">
                          <h3 
                            className="text-xl font-playfair font-semibold"
                            dangerouslySetInnerHTML={{ __html: item.name }}
                          />
                        </Link>
                        <span className="font-semibold text-lg whitespace-nowrap">{price.toFixed(2)} $</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        {item.categories?.[0]?.name}
                      </p>
                      
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="text-sm text-muted-foreground mb-4 flex flex-wrap gap-2">
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <span key={key} className="bg-muted px-2 py-1 rounded-md">{value}</span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-md w-fit">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId || item.id.toString(), item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId || item.id.toString(), item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.cartItemId || item.id.toString())}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-8 sticky top-32 shadow-sm">
                <h3 className="text-xl font-playfair font-bold mb-6">Résumé de la commande</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{getTotal().toFixed(2)} $</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span>Calculée à la caisse</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span>Calculées à la caisse</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mb-8">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total estimé</span>
                    <span className="text-primary">{getTotal().toFixed(2)} $</span>
                  </div>
                </div>

                <Link 
                  href="/caisse"
                  className="w-full flex justify-center py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
                >
                  Passer à la caisse
                </Link>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Paiement 100% sécurisé. 
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
