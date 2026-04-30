import { searchProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await searchParams as required by Next.js 15
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams.q;
  const query = typeof rawQuery === 'string' ? rawQuery : '';

  let products: any[] = [];
  if (query) {
    products = await searchProducts(query);
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Recherche</span>
        </nav>

        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Résultats de recherche
          </h1>
          {query ? (
            <p className="text-lg text-muted-foreground">
              {products.length} {products.length > 1 ? 'résultats trouvés' : 'résultat trouvé'} pour "{query}"
            </p>
          ) : (
            <p className="text-lg text-muted-foreground">
              Veuillez entrer un terme de recherche.
            </p>
          )}
          <div className="w-16 h-1 bg-primary mt-6 rounded-full" />
        </div>

        {/* Results Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          query && (
            <div className="py-20 text-center bg-muted/30 rounded-lg border border-border">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">Aucun produit trouvé</h2>
              <p className="text-muted-foreground mb-8">
                Nous n'avons trouvé aucun produit correspondant à votre recherche. Essayez d'autres mots-clés.
              </p>
              <Link 
                href="/boutique" 
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Parcourir la boutique
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
