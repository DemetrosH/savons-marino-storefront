"use client";

import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-playfair font-semibold">Votre Panier</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Votre panier est vide.</p>
              <button 
                onClick={closeCart}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continuer vos achats
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-border pb-6">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={item.images?.[0]?.src || 'https://placehold.co/400x400?text=Savons+Marino'} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 
                      className="font-medium text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item.name }}
                    />
                    <button 
                      onClick={() => removeItem(item.cartItemId || item.id.toString())}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-1">
                      {Object.entries(item.selectedOptions).map(([key, value]) => (
                        <span key={key} className="bg-muted px-2 py-0.5 rounded-full">{value}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-md mt-2">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId || item.id.toString(), item.quantity - 1)}
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId || item.id.toString(), item.quantity + 1)}
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-semibold text-primary">
                      {((parseInt(item.prices?.price || '0') / 100) * item.quantity).toFixed(2)} $
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 bg-card">
            <div className="flex justify-between items-center mb-6 text-lg font-semibold">
              <span>Sous-total</span>
              <span>{getTotal().toFixed(2)} $</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Taxes et frais de livraison calculés à l'étape de paiement.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="/panier"
                className="w-full py-3 text-center border border-border text-foreground font-semibold rounded-md hover:bg-muted transition-colors uppercase tracking-wider text-sm"
              >
                Voir le panier
              </a>
              <a 
                href="/caisse"
                className="w-full py-4 text-center bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm"
              >
                Passer à la caisse
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
