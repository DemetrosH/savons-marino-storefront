import Link from "next/link";
import { MapPin, Phone, ShoppingBag, Calendar, Info } from "lucide-react";
import PointsDeVenteClient from "@/components/PointsDeVenteClient";

async function getPointsDeVente() {
  try {
    const res = await fetch('https://www.savonsmarino.ca/wp-json/wp/v2/pointe_de_vente?per_page=100', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching points de vente:", error);
    return [];
  }
}

export default async function PointsDeVentePage() {
  const pointsDeVenteApi = await getPointsDeVente();
  
  const pointsDeVente = pointsDeVenteApi.map((post: any) => {
    // Decode HTML entities from WordPress title
    const decodedName = post.title.rendered.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&");
    
    return {
      name: decodedName,
      address: post.acf?.address || "Adresse non spécifiée",
      region: post.acf?.region || "Québec",
      isHQ: decodedName.toLowerCase().includes("siège social") || decodedName.toLowerCase().includes("siege social"),
      lat: post.acf?.maps?.lat,
      lng: post.acf?.maps?.lng
    };
  });

  // Sort alphabetically by name
  pointsDeVente.sort((a: any, b: any) => a.name.localeCompare(b.name));

  const marches = [
    { season: "Marchés d’été", events: ["Marché public de Deschambault"] },
    { season: "Événement automnal", events: ["La Route des Arts et Saveurs de Portneuf"] },
    { season: "Marchés d’hiver", events: ["Miracle à Saint-Casimir // marché de Noël", "Noël au village à Deschambault", "Marché du Noël d’Antan de Cap-Santé"] },
  ];

  return (
    <div className="min-h-screen bg-background pt-[116px]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2026/04/SM_porte-ouvertes_15avril2026-18-scaled.jpg)` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-32 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            Points de vente
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8">
            Retrouvez nos produits près de chez vous.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-16 text-center max-w-3xl">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 shadow-sm">
          <Info className="w-10 h-10 text-primary mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Pour connaître les produits disponibles dans ces points de vente, nous vous suggérons de leur téléphoner afin de vous assurer de retrouver le produit recherché.
          </p>
          <p className="text-lg md:text-xl font-medium text-foreground mt-6 italic">
            "Il est à noter que la gamme complète et le plus grand choix d'inventaire se trouvent directement à l'atelier, à Saint-Casimir, au Presbytère : Espace santé & mieux-être."
          </p>
          <div className="mt-8">
            <Link 
              href="/siege-social" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Visiter notre siège social <MapPin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Marchés Publics Section */}
      <section className="bg-muted/30 py-24 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Venez nous voir aux marchés publics
            </h2>
            <p className="text-muted-foreground">Des moments privilégiés pour découvrir nos nouveautés.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marches.map((marche, idx) => (
              <div key={idx} className="bg-background p-8 rounded-xl shadow-sm border border-border">
                <Calendar className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{marche.season}</h3>
                <ul className="space-y-3">
                  {marche.events.map((event, eIdx) => (
                    <li key={eIdx} className="text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-2 shrink-0" />
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Et plusieurs autres! Surveillez notre page Facebook pour rester à l’affût.</p>
            <a 
              href="https://www.facebook.com/lessavonsmarino" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Suivre sur Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Points of Sale Grid & Map */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <PointsDeVenteClient pointsDeVente={pointsDeVente} />
      </section>

      {/* Footer CTA */}
      <section className="bg-primary/5 py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-playfair font-bold mb-6">Devenir partenaire?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Vous souhaitez distribuer nos produits dans votre boutique? Nous serions ravis d'en discuter avec vous.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm shadow-md"
          >
            Nous contacter
          </Link>
        </div>
      </section>

    </div>
  );
}
