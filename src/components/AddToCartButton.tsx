"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/woocommerce";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: Product;
  matchedVariationId?: number | null;
  selectedOptions?: Record<string, string>;
  isVariable?: boolean;
  variableAttributes?: any[];
}

export default function AddToCartButton({ 
  product, 
  matchedVariationId = null, 
  selectedOptions = {},
  isVariable = false,
  variableAttributes = []
}: AddToCartButtonProps) {
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (isVariable) {
      // Check if all variation attributes have been selected
      const missingOptions = variableAttributes.filter(
        attr => !selectedOptions[attr.name]
      );

      if (missingOptions.length > 0) {
        alert(`Veuillez sélectionner une option pour : ${missingOptions.map(o => o.name).join(", ")}`);
        return;
      }
    }

    addToCart(product, matchedVariationId, selectedOptions);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-md font-semibold tracking-wide hover:bg-primary/90 transition-colors shadow-sm"
    >
      <ShoppingCart className="w-5 h-5" />
      Ajouter au panier
    </button>
  );
}
