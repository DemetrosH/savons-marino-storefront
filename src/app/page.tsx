import HeroCarousel from "@/components/HeroCarousel";
import { getProducts } from "@/lib/woocommerce";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const allProducts = await getProducts();
  
  // Featured products (e.g. top 4 products)
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <>
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Webshop Introduction Section */}
      <section className="bg-primary/5 py-24 md:py-32 border-y border-border relative overflow-hidden my-12">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Elegant Icon */}
            <div className="flex justify-center mb-8">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2C8 2 4 6 4 11C4 16.5 12 22 12 22C12 22 20 16.5 20 11C20 6 16 2 12 2Z" fill="currentColor" fillOpacity="0.1"/>
                <path d="M12 22V11" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-10 leading-snug">
              Savonnerie artisanale – Savons naturels et hydratants décorés délicatement de fleurs sauvages ou de nos jardins de Saint-Thuribe.
            </h2>
            
            <div className="w-24 h-1 bg-primary/40 mx-auto rounded-full mb-10" />
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
              Les Savons Marino offrent une large gamme de savons saponifiés à froid, de produits de soin de la peau et de produits ménagers et de détente, tous composés d'ingrédients naturels, biodégradables, locaux et de première qualité. <br/><br/>
              <span className="font-medium text-foreground/80 italic">Tous nos produits sont fabriqués et emballés à la main, avec un souci environnemental.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-center mb-4">
            Nos Meilleurs Vendeurs
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl">
            Découvrez nos créations les plus appréciées, fabriquées à la main avec passion.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/boutique"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium tracking-wide rounded-md hover:bg-primary/90 transition-colors"
          >
            Voir toute la boutique
          </Link>
        </div>
      </section>

      {/* About Section Snippet */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-playfair font-bold mb-6">L'Art de la Savonnerie</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Découvrez nos ateliers de fabrication de savons selon le procédé à froid. 
            Apprenez les techniques de base théoriques et pratiques pour créer vos propres chefs-d'œuvre.
          </p>
          <a 
            href="/cours-savons"
            className="inline-block px-8 py-3 border-2 border-primary text-primary font-medium tracking-wide uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Découvrir nos cours
          </a>
        </div>
      </section>

    </>
  );
}
