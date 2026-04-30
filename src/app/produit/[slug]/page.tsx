import { getProductBySlug, getProductVariations, getProducts } from "@/lib/woocommerce";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductClientLayout from "@/components/ProductClientLayout";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center min-h-screen">
        <h1 className="text-3xl font-playfair font-bold mb-4">Produit introuvable</h1>
        <p className="text-muted-foreground mb-8">Désolé, nous n'avons pas pu trouver ce produit.</p>
        <Link href="/boutique" className="text-primary hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  // Fetch variations if the product is variable
  let variations: any[] = [];
  if (product.type === "variable") {
    variations = await getProductVariations(product.id);
  }

  // Fetch related products (e.g., from the same category)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.categories?.some(c => c.id === product.categories?.[0]?.id))
    .slice(0, 4);

  const price = product.prices?.price ? (parseInt(product.prices.price) / 100).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen pt-52 lg:pt-44 pb-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
          {product.categories && product.categories.length > 0 && (
            <>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/boutique/categorie/${product.categories[0].slug}`} className="hover:text-primary transition-colors">
                {product.categories[0].name}
              </Link>
            </>
          )}
          <ChevronRight className="w-4 h-4" />
          <span 
            className="text-foreground line-clamp-1"
            dangerouslySetInnerHTML={{ __html: product.name }}
          />
        </nav>

        {/* Product Layout */}
        <ProductClientLayout 
          product={product} 
          variations={variations} 
          defaultPrice={price} 
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16 mt-16">
            <div className="flex flex-col items-center mb-12">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-center mb-4">
                Vous aimerez aussi
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
