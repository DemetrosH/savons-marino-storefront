import { getProducts, getCategories } from "@/lib/woocommerce";
import BoutiqueGrid from "@/components/BoutiqueGrid";

export const metadata = {
  title: 'Boutique | Savons Marino',
  description: 'Magasinez nos savons naturels, shampoings, déodorants et huiles essentielles.',
};

export default async function BoutiquePage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen pt-52 lg:pt-44 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Notre Boutique
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits artisanaux, tous fabriqués à la main avec soin et respect de la nature.
          </p>
        </div>

        <BoutiqueGrid products={products} categories={categories} />
      </div>
    </div>
  );
}
