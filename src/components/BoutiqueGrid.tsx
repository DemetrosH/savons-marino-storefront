"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Link from "next/link";
import React, { Suspense, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // --- STYLE CONFIG (Easy to revert) ---
  const pillSizing = "px-8 py-4 text-base font-semibold tracking-wide"; 
  // Previous: "px-6 py-3 text-sm font-medium"
  // ---------------------------------------

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [displayCategories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      const target = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      // Custom smooth scroll animation (0.6s duration)
      const duration = 600;
      const start = scrollLeft;
      const change = target - start;
      let startTime: number | null = null;

      const animateScroll = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const t = Math.min(progress / duration, 1);
        
        // easeInOutQuad easing
        const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = start + change * easedT;
        }

        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          checkScroll(); // Final check after animation
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <div className="w-full" id="boutique-grid-top">
      <div className="relative group mb-12">
        {/* Left Arrow with smooth transition and better positioning */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-background/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-background transition-all duration-300 -ml-6 ${showLeftArrow ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow with smooth transition and better positioning */}
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-background/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-border flex items-center justify-center hover:bg-background transition-all duration-300 -mr-6 ${showRightArrow ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="w-full overflow-x-auto pb-4 no-scrollbar touch-pan-x"
        >
          <div className="flex items-center justify-start lg:justify-center gap-4 w-max min-w-full px-8">
            {displayCategories.map((category: any) => (
              <Link
                key={category.id}
                href={`/boutique?cat=${category.slug}`}
                scroll={false}
                className={`${pillSizing} rounded-full transition-all duration-300 active:scale-95 cursor-pointer relative z-30 whitespace-nowrap ${
                  activeCategory === category.slug
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: category.displayName || category.name }} />
              </Link>
            ))}
          </div>
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
