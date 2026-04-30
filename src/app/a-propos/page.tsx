import Link from "next/link";
import Image from "next/image";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-background pt-[116px]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-muted flex items-center justify-center overflow-hidden">
        {/* Background Grid - Desktop only */}
        <div className="absolute inset-0 hidden md:grid md:grid-cols-3 w-full h-full">
          <div 
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_2749.jpg)` }}
          />
          <div 
            className="relative w-full h-full bg-cover bg-center border-x border-white/5"
            style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2026/04/SM_porte-ouvertes_15avril2026-24-scaled.jpg)` }}
          />
          <div 
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5611-scaled.jpg)` }}
          />
        </div>

        {/* Background Mobile - Only middle image */}
        <div 
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2026/04/SM_porte-ouvertes_15avril2026-24-scaled.jpg)` }}
        />

        {/* Unified Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-32 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 drop-shadow-lg">
            À propos
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 drop-shadow-md">
            Un passe-temps qui devient une passion!
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full shadow-lg" />
        </div>
      </section>

      {/* Historique Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-md">
            <img 
              src="https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_2659.jpg" 
              alt="Marie-Ève Naud - Savons Marino"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Historique
            </h2>
            <h3 className="text-xl font-medium text-primary mb-6">
              D'où sont nés les savons Marino?
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Cette passion des savons est née durant la pandémie de Covid-19. Cette période particulière n'a pas eu que du négatif; elle a fait naître certains projets, dont les Savons Marino en 2021, qui comblent mon côté créatif, entrepreneurial et social. Ce nouveau passe-temps est devenu naturellement une petite entreprise spécialisée, principalement de savon de qualité fabriqué à la main, avec amour et un grand souci du détail.
              </p>
              <p>
                Originaire du comté de Portneuf, certains m'ont toutefois connue avec une autre sorte de tablier. J'ai passé plus de 10 ans en restauration, dont en tant que cuisinière, pâtissière et gérante. Ma passion de la cuisine et de l'artisanat se sont fusionnées et une nouvelle en a émergé : le monde de la savonnerie artisanale.
              </p>
              <p>
                Ma première recette de savon fut réalisée avec mon amoureux dans le but de s'autosuffire et c'est sans relâche qu'il m'encourage dans mes bulles. Ma deuxième recette fut confectionnée avec ma petite assistante Emma, ma fille, qui partage les mêmes habiletés, celles de créer et de jouer dans la cuisine; mais cette fois-ci, on ne peut pas en manger!
              </p>
              <p className="font-playfair text-xl text-foreground pt-4">
                Marie-Ève Naud, alias Marino! 😊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophie Section */}
      <section className="bg-muted/30 py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto flex-col-reverse md:flex-row-reverse">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
                Philosophie
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Les Savons Marino me permettent de concilier le travail et la famille et de trouver un équilibre, tout en respectant certaines de mes valeurs personnelles, qui transparaissent dans l'entreprise.
                </p>
                <p>
                  Il est évident pour moi de réussir à combler mon côté créatif et artistique, qui se transmet dans mes savons tout aussi attirants qu'odorants. Chaque savon naturel est délicatement décoré de fleurs et de plantes médicinales provenant de mes jardins.
                </p>
                <p>
                  La base de mes savons est complètement naturelle, de l'odeur à la couleur. Elle est conçue pour tous les types de peau, particulièrement les peaux sensibles. Mes recettes, le choix de mes huiles et beurres ainsi que plusieurs autres ingrédients font de ces savons des produits des plus hydratants, réparateurs et durables.
                </p>
                <p>
                  Le choix de mes emballages est pensé dans un esprit zéro déchet, soit recyclés, recyclables, décomposables ou réutilisables. L'impact des produits sur l'environnement est pour moi un souci; tous les produits sont d'ailleurs biodégradables.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col gap-4 mt-8">
                <img src="https://www.savonsmarino.ca/wp-content/uploads/2025/09/IMG_3026-768x1024.jpg" alt="Savon artisanal" className="rounded-lg object-cover h-64 w-full shadow-sm" />
                <img src="https://www.savonsmarino.ca/wp-content/uploads/2025/02/IMG_1646-768x1024.jpg" alt="Ingrédients naturels" className="rounded-lg object-cover h-48 w-full shadow-sm" />
              </div>
              <div className="flex flex-col gap-4">
                <img src="https://www.savonsmarino.ca/wp-content/uploads/2023/10/IMG_6494-1024x841.jpg" alt="Chandelle artisanale" className="rounded-lg object-cover h-48 w-full shadow-sm" />
                <img src="https://www.savonsmarino.ca/wp-content/uploads/2025/01/IMG_0488-1-1024x768.jpg" alt="Savon naturel" className="rounded-lg object-cover h-64 w-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Dans les médias
          </h2>
          <p className="text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Découvrez notre univers à travers ces reportages et entrevues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-border">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/s661siqdjxw" 
                title="Rencontre Avec La Fondatrice des Savons Marino - Tattoo 10 000 Dots" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg border border-border">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/OuIc6D1sc1k" 
                title="marieevenaud 1001visages mp4 1080p" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Call to Action */}
      <section className="bg-primary/5 py-24 border-t border-border">

        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-playfair font-bold mb-6">Découvrez nos créations</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Maintenant que vous connaissez notre histoire, venez découvrir le fruit de notre passion.
          </p>
          <Link 
            href="/boutique"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm shadow-md hover:shadow-lg"
          >
            Visiter la boutique
          </Link>
        </div>
      </section>

    </div>
  );
}
