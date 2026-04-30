"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/woocommerce";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductClientLayoutProps {
  product: Product;
  variations: any[];
  defaultPrice: string;
}

export default function ProductClientLayout({ product, variations, defaultPrice }: ProductClientLayoutProps) {
  // State to hold selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Find attributes that are used for variations
  const variableAttributes = product.attributes?.filter(
    (attr: any) => attr.has_variations === true || attr.variation === true
  ) || [];

  const isVariable = product.type === "variable" || variableAttributes.length > 0;

  const handleOptionSelect = (attributeName: string, optionName: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [attributeName]: optionName
    }));
  };

  // Find matched variation
  const matchedVariation = useMemo(() => {
    if (!isVariable || variations.length === 0) return null;
    if (Object.keys(selectedOptions).length === 0) return null;

    // Filter variations based on selected options
    const match = variations.find(v => {
      return v.attributes.every((attr: any) => {
        // v3 uses 'option', store API uses 'value'
        const attrVal = attr.option || attr.value;
        // If the variation attribute is empty/null, it means "Any"
        if (!attrVal || attrVal === "") return true;
        // Check if selected option matches
        return selectedOptions[attr.name] === attrVal;
      });
    });

    return match || null;
  }, [selectedOptions, variations, isVariable]);

  // Determine current price
  let currentPrice = defaultPrice;
  if (matchedVariation && matchedVariation.price) {
    currentPrice = (parseFloat(matchedVariation.price)).toFixed(2);
  }

  // Determine current images for gallery
  let currentImages = product.images || [];
  if (matchedVariation && matchedVariation.image && matchedVariation.image.src) {
    // Put variation image first
    currentImages = [
      {
        id: matchedVariation.image.id,
        src: matchedVariation.image.src,
        thumbnail: matchedVariation.image.src,
        alt: matchedVariation.image.alt || product.name
      },
      ...currentImages.filter(img => img.id !== matchedVariation.image.id)
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-24">
      {/* Product Gallery */}
      <div className="w-full">
        <ProductGallery images={currentImages} productName={product.name} />
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <h1 
          className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4"
          dangerouslySetInnerHTML={{ __html: product.name }}
        />
        
        <div className="text-2xl font-medium text-primary mb-6 transition-all duration-300">
          {currentPrice} $
        </div>
        
        {/* Short Description */}
        {product.short_description && (
          <div 
            className="text-lg text-muted-foreground mb-8 prose prose-p:mb-2 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        {/* Variation Selectors */}
        {isVariable && variableAttributes.length > 0 && (
          <div className="flex flex-col gap-6 mb-8">
            {variableAttributes.map((attr: any, index: number) => {
              const terms = attr.terms || attr.options || [];
              const optionsList = Array.isArray(terms) 
                ? terms.map((t: any) => typeof t === 'string' ? t : t.name)
                : [];

              return (
                <div key={index} className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    {attr.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {optionsList.map((option: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(attr.name, option)}
                        className={`px-4 py-2 text-sm rounded-md border transition-all ${
                          selectedOptions[attr.name] === option
                            ? "border-primary bg-primary/10 text-primary font-medium shadow-sm"
                            : "border-border bg-background hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add to Cart Section */}
        <div className="mb-12">
          {/* We pass the matched variation ID and selected options to AddToCartButton */}
          {/* So AddToCartButton can be simplified to just handle the cart logic */}
          <AddToCartButton 
            product={product} 
            matchedVariationId={matchedVariation?.id} 
            selectedOptions={selectedOptions}
            isVariable={isVariable}
            variableAttributes={variableAttributes}
          />
        </div>

        {/* Full Description */}
        {product.description && (
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-2xl font-playfair font-semibold mb-4">Description</h2>
            <div 
              className="text-muted-foreground prose prose-p:mb-4 max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
