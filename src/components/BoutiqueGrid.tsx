"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";

interface BoutiqueGridProps {
  products: any[];
  categories: any[];
}

function BoutiqueGridContent({ products, categories }: BoutiqueGridProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";

  // Filter out empty categories and specific hidden ones for the pills
  const mainCategories = categories
    .filter(cat => cat.parent === 0 && (cat.count ?? 0) > 0)
    .filter(cat => !['produits_detente', 'vivi_aromatherapie', 'le_boise'].includes(cat.slug))
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0));

  // Add the combined essential oils category
  const displayCategories = [
    { id: 'all', name: 'Tous les produits', slug: 'all' },
    ...mainCategories.map(cat => {
      let displayName = cat.name;
      if (cat.slug === 'deodorant') displayName = 'Déodorants';
      if (cat.slug === 'soins_de_peau') displayName = 'Soins de la peau';
      if (cat.slug === 'shampoing_revitalisant') displayName = 'Shampoings et revitalisant';
      return { ...cat, displayName };
    }),
    { id: 'huiles-essentielles', name: 'Huiles essentielles', slug: 'huiles-essentielles', displayName: 'Huiles essentielles' }
  ];

  // Filter products based on active category
  const filteredProducts = products.filter(product => {
    if (activeCategory === "all") return true;
    
    // Special handling for the virtual "Huiles essentielles" category
    if (activeCategory === "huiles-essentielles") {
      return product.categories?.some((c: any) => 
        ['vivi_aromatherapie', 'le_boise', 'huiles-essentielles'].includes(c.slug)
      );
    }
    
    // Check if the product has the active category slug
    return product.categories?.some((c: any) => c.slug === activeCategory);
  });

  return (
    <div className="w-full" id="boutique-grid-top">
      {/* Horizontal Pill Filters */}
      <div className="w-full overflow-x-auto pb-4 mb-10 no-scrollbar">
        <div className="flex items-center justify-start md:justify-center gap-3 px-4 min-w-max">
          {displayCategories.map((category: any) => (
            <Link
              key={category.id}
              href={`/boutique?cat=${category.slug}`}
              scroll={false}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer relative z-30 ${
                activeCategory === category.slug
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: category.displayName || category.name }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2 md:px-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-xl font-playfair mb-2">Aucun produit trouvé</p>
          <p>Désolé, il n'y a actuellement aucun produit dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}

export default function BoutiqueGrid(props: BoutiqueGridProps) {
  return (
    <Suspense fallback={<div className="h-24 w-full animate-pulse bg-muted rounded-lg" />}>
      <BoutiqueGridContent {...props} />
    </Suspense>
  );
}
