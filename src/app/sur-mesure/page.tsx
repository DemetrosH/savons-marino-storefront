import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sur mesure - Savons Marino",
  description: "Créons ensemble votre savon personnalisé et unique! Un savon à votre image?! Il est tout à fait possible de le demander.",
};

const galleryItems = [
  {
    title: "Collaboration ensemble cadeau - Paradox",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/9ED41FF2-79F9-4CF6-82B4-76750E603DB2.jpg"
  },
  {
    title: "Ensemble - cadeau corporatif",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_9417.webp"
  },
  {
    title: "Estampe Magasin Général Paré",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/7582937B-C79D-4938-AB0B-83FF0335CD9D.jpg"
  },
  {
    title: "Estampe Vallée du-Bras-du Nord",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5525.webp"
  },
  {
    title: "Événement - prix présence",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/363ABDC9-D8C1-4A07-9E92-5466FD865DCA.jpg"
  },
  {
    title: "Exposition Riopelle à St-Thuribe",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/08/Exposition-Riopelle-a-St-Thuribe.webp"
  },
  {
    title: "Mariage",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5522.webp"
  },
  {
    title: "Produits thématiques - Festival de La Banquise",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_7748.webp"
  },
  {
    title: "Savon bière - Ferme du Tarieu",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5574.webp"
  },
  {
    title: "Savon bière - La Fosse",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_7772.jpeg"
  },
  {
    title: "Savon bière - Les Grands Bois",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_4800.jpeg"
  },
  {
    title: "Savon érable - Entreprise érabliere",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/08/Savon-erable-Entreprise-erabliere.webp"
  },
  {
    title: "Savon personnalisé pour besoins particuliers",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_7336.webp"
  },
  {
    title: "Savon personnalisé - Bivouac",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_2659.jpg"
  },
  {
    title: "Savon personnalisé - Godin et Fils",
    src: "https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5521.webp"
  }
];

export default function SurMesurePage() {
  return (
    <div className="min-h-screen bg-background pt-[116px]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5521.webp)` }} // Using one of the nice custom soaps for hero
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-32 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-widest">
            Sur mesure
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Introduction Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-semibold text-foreground mb-8">
            Créons ensemble votre savon personnalisé et unique!
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Un savon à votre image?! Il est tout à fait possible de le demander. Que vous soyez un particulier ou une entreprise, en petite ou grande quantité, nous élaborerons le savon que vous souhaitez.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Vous cherchez un cadeau corporatif, un cadeau de mariage, un savon personnalisé pour votre campagne de financement, un prix de présence pour un événement, un savon fait avec un ingrédient de votre entreprise agroalimentaire; bref, c’est le genre de projet qui m’anime.
          </p>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-medium font-playfair text-primary italic">
              Sur mesure, local et fait à la main.
            </span>
            <span className="text-xl font-semibold text-foreground">
              On s’appelle?
            </span>
            <Link 
              href="/contact"
              className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Nous joindre
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16">
            Nos réalisations
          </h3>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-background border border-border"
              >
                <div className="relative overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.src} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-6 text-center border-t border-border">
                  <h4 className="font-playfair font-medium text-lg text-foreground">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
