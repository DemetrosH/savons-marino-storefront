import { getProductsByCategorySlug, getCategories } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Wait for the params promise (Next.js 15 App Router requirement)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const [categories] = await Promise.all([
    getCategories()
  ]);

  let currentCategory = categories.find(c => c.slug === slug);
  let isVirtualCategory = false;
  let virtualSubcategories: any[] = [];
  let virtualProductsGrouped: Record<string, any[]> = {};
  let products: any[] = [];

  if (slug === 'huiles-essentielles') {
    isVirtualCategory = true;
    currentCategory = {
      id: 9999,
      name: "Huiles essentielles",
      slug: "huiles-essentielles",
      description: "Découvrez nos huiles essentielles Vivia Aromathérapie et notre gamme Le Boisé."
    } as any;
    
    virtualSubcategories = categories.filter(c => ['vivi_aromatherapie', 'le_boise'].includes(c.slug));
    
    const allVirtualProductsLists = await Promise.all(
      virtualSubcategories.map(sub => getProductsByCategorySlug(sub.slug))
    );
    
    virtualSubcategories.forEach((sub, index) => {
      virtualProductsGrouped[sub.slug] = allVirtualProductsLists[index];
    });
  } else {
    products = await getProductsByCategorySlug(slug);
  }

  // Define allowed subcategories for the "Savons" page
  const ALLOWED_SAVONS_SUBCATEGORIES = ['boreal', 'floral', 'soin', 'exfoliant'];
  
  const displaySubcategories = categories.filter(c => {
    if (c.parent !== currentCategory?.id) return false;
    if (currentCategory?.slug === 'savons') {
      return ALLOWED_SAVONS_SUBCATEGORIES.includes(c.slug);
    }
    return c.slug !== 'savons_a_7_5-cad'; // general rule for other categories
  });

  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-playfair font-bold mb-4">Catégorie introuvable</h1>
        <p className="text-muted-foreground mb-8">Nous n'avons pas pu trouver cette catégorie.</p>
        <Link href="/boutique" className="text-primary hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-52 lg:pt-44 pb-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{currentCategory.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            {currentCategory.name}
          </h1>
          {currentCategory.description && (
            <div 
              className="text-lg text-muted-foreground max-w-3xl"
              dangerouslySetInnerHTML={{ __html: currentCategory.description }}
            />
          )}
          <div className="w-16 h-1 bg-primary mt-6 rounded-full" />
        </div>

        {/* Subcategories Grid (Anchor Links for grouping) */}
        {!isVirtualCategory && displaySubcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-playfair font-bold mb-6">Sous-catégories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displaySubcategories.map(sub => (
                  <a 
                    key={sub.id} 
                    href={`#${sub.slug}`}
                    className="bg-muted border border-border rounded-lg p-4 text-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="font-medium">{sub.name}</span>
                    <span className="text-sm opacity-80 block mt-1">{sub.count} produits</span>
                  </a>
                ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {isVirtualCategory ? (
          <div className="space-y-16 mt-8">
            {virtualSubcategories.map(sub => (
              <div key={sub.slug} id={sub.slug} className="scroll-mt-32">
                <h2 className="text-3xl font-playfair font-bold mb-8 pb-2 border-b border-border inline-block">
                  {sub.name}
                </h2>
                
                {virtualProductsGrouped[sub.slug]?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {virtualProductsGrouped[sub.slug].map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Aucun produit dans cette section.</p>
                )}
              </div>
            ))}
          </div>
        ) : displaySubcategories.length > 0 ? (
          <div className="space-y-16 mt-8">
            {displaySubcategories.map(subCat => {
                const subProducts = products.filter(p => p.categories.some(c => c.id === subCat.id));
                if (subProducts.length === 0) return null;
                
                return (
                  <div key={subCat.id} id={subCat.slug} className="scroll-mt-32">
                    <h2 className="text-3xl font-playfair font-bold mb-8 pb-2 border-b border-border inline-block">
                      {subCat.name}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                      {subProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
              
            {/* Uncategorized / Other products in this category */}
            {(() => {
              // Hide the 'Autres' section for the 'savons' category as requested
              if (currentCategory?.slug === 'savons') return null;

              const childCatIds = displaySubcategories.map(c => c.id);
              const uncategorizedProducts = products.filter(p => !p.categories.some(c => childCatIds.includes(c.id)) && p.categories.some(c => c.id === currentCategory?.id));
              
              if (uncategorizedProducts.length === 0) return null;
              
              return (
                <div key="autres" className="scroll-mt-32">
                  <h2 className="text-3xl font-playfair font-bold mb-8 pb-2 border-b border-border inline-block">
                    Autres {currentCategory?.name.toLowerCase()}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {uncategorizedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-muted rounded-lg border border-border mt-8">
            <h2 className="text-xl font-medium mb-2">Aucun produit</h2>
            <p className="text-muted-foreground">
              Il n'y a actuellement aucun produit dans cette catégorie.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
