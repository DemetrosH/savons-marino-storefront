import Link from "next/link";

export default function CoursSavonsPage() {
  return (
    <div className="min-h-screen bg-background pt-[116px]">
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-muted flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_7368-scaled.jpeg)` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-32 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-widest">
            Cours de savons
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 leading-relaxed">
            Vous cherchez une nouvelle activité pour augmenter vos connaissances en soins de la peau? Inscrivez-vous au prochain cours de fabrication de savon!
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Cours de base Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-md">
            <img 
              src="https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_1945-1024x1536.jpg" 
              alt="Cours de savonnerie de base"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Cours de savonnerie de base
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Atelier complet sur la fabrication de savon de base, où vous apprendrez les techniques de base selon le procédé à froid, sous les formes théorique et pratique. Le but est de vous mettre à l’aise avec la SAF, afin de refaire du savon vous-même à la maison avec une recette pré-établie.
              </p>
              <p>
                Vous fabriquerez une quantité de savon d’environ 500 g (équivalant à 5 savons de taille normale) pour votre utilisation personnelle, que vous pourrez parfumer avec des huiles essentielles, si désiré.
              </p>
              <p>
                Tout le matériel est fourni. Vous repartirez avec les notes de cours, un moule, la recette et votre pain de savon. Nous suggérons aux participants de s’habiller avec des vêtements appropriés pour « cuisiner » et des manches longues ou un tablier.
              </p>
              
              <ul className="list-none mt-4 space-y-2 text-foreground font-medium bg-muted/50 p-6 rounded-lg border border-border shadow-sm">
                <li><span className="text-primary font-bold">Où :</span> 110 place de l’église, St-Casimir, Le Presbytère : Espace Santé et Mieux-être</li>
                <li><span className="text-primary font-bold">Durée :</span> 3 heures</li>
                <li><span className="text-primary font-bold">Coût :</span> 95 $, taxes incluses.</li>
              </ul>
              
              <p className="mt-4">
                Le paiement est requis afin de réserver votre place. Pour connaître la date du prochain cours, réserver et s’inscrire, contactez-nous à l’adresse courriel suivante : <a href="mailto:savonsmarino@gmail.com" className="text-primary hover:underline">savonsmarino@gmail.com</a>.
              </p>
              <p>
                En général, les cours sont prévus deux fois par année.
              </p>
              <p className="italic bg-primary/5 p-4 border-l-4 border-primary rounded mt-4">
                Sur demande, nous pouvons nous déplacer dans votre entreprise ou pour un événement intérieur ou extérieur, pour une formation sur mesure. Contactez-nous pour nous faire part de vos besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garderie Section */}
      <section className="bg-muted/30 py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto flex-col-reverse md:flex-row-reverse">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
                Atelier pour garderie familiale ou CPE (0-5 ans)
              </h2>
              <h3 className="text-xl font-medium text-primary mb-6">
                Une belle avant-midi bien remplit avec Marino dans ta garderie!
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Atelier participatif à la confection de savon à la glycérine en toute sécurité. Chaque enfant participe à tour de rôle, décore son propre savon et l’emballe de son coloriage thématique.
                </p>
                <div className="bg-background p-6 rounded-lg border border-border shadow-sm my-6">
                  <h4 className="font-playfair text-xl text-foreground mb-4">Grandes lignes du déroulement :</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Jeu physique thématique pour dépenser de l’énergie</li>
                    <li>Histoire thématique ou Yoga enfant pour se calmer et se centrer</li>
                    <li>Discussion autour du sujet savon</li>
                    <li>Devinette et jeu de vrai ou faux</li>
                    <li>Confection des nos savons et participation à tour de rôle</li>
                    <li>Confection du papier d’emballage</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-2 mt-6 font-medium text-foreground">
                  <p><span className="text-primary font-bold">Durée :</span> environ 1h30</p>
                  <p><span className="text-primary font-bold">Prix :</span> 100$ taxes incluses.</p>
                  <p className="text-sm italic font-normal text-muted-foreground">Frais de déplacement en sus.</p>
                  <p className="text-sm font-bold text-primary bg-primary/10 p-3 rounded mt-2">* La présence de l’éducatrice est requise. L’enfant repart avec son savon.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-md">
              <img 
                src="https://www.savonsmarino.ca/wp-content/uploads/2025/03/IMG_1633-768x1024.jpg" 
                alt="Atelier Garderie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ecole Primaire Section */}
      <section className="container mx-auto px-4 py-24 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-md">
            <img 
              src="https://www.savonsmarino.ca/wp-content/uploads/2025/03/IMG_1624-768x1024.jpg" 
              alt="Atelier École Primaire"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Atelier pour école primaire et service de garde (4 à 12 ans)
            </h2>
            <h3 className="text-xl font-medium text-primary mb-6">
              Reçoit Les Savons Marino dans ta classe!
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Atelier participatif à la confection de savon à la glycérine en toute sécurité. Dans son équipe, l’enfant participera chacun à son tour à la confection, décorera son propre savon et l’emballera de son coloriage thématique.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg border border-border mt-6">
                <h4 className="font-playfair text-xl text-foreground mb-4">Grandes lignes du déroulement :</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Accueil et présentations</li>
                  <li>Légère discussion sur les savons (exemple: jeu de vrai ou faux)</li>
                  <li>Présentation des ingrédients</li>
                  <li>Explication de notre marche à suivre</li>
                  <li>Distribution des tâches</li>
                  <li>Fabrication des savons en petit groupe</li>
                  <li>Confection d’un papier d’emballage individuel</li>
                  <li>Distribution des certificats d’APPRENTI SAVONNIER :)</li>
                  <li>Fin de l’atelier</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 mt-6 font-medium text-foreground">
                <p><span className="text-primary font-bold">Durée :</span> environ 1h30</p>
                <p><span className="text-primary font-bold">Prix :</span> 12$ taxes incluses/enfant</p>
                <p className="text-sm italic font-normal text-muted-foreground">Frais de déplacement en sus.</p>
                <div className="mt-4 p-4 bg-background border-l-4 border-l-primary rounded shadow-sm">
                  <p>L’enfant repart avec un savon.</p>
                  <p className="font-bold text-primary mt-1">Minimum de 10 participants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecole Secondaire Section */}
      <section className="bg-muted/30 py-24 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-12 text-center">
            Atelier pour école secondaire
          </h2>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed text-lg">
            
            {/* Image For Secondaire */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border shadow-md mb-12">
              <img 
                src="https://www.savonsmarino.ca/wp-content/uploads/2025/03/IMG_1865-768x1024.jpg" 
                alt="Atelier École Secondaire"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Option 1 */}
            <div className="bg-background p-8 rounded-lg border-t-4 border-t-primary shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-2">1- Démonstration participative</h3>
              <p className="font-medium text-primary mb-6 text-xl">200$+tx <span className="text-sm font-normal text-muted-foreground">(Savon non inclus)</span></p>
              
              <h4 className="font-playfair font-bold text-lg text-foreground mb-3">Déroulement :</h4>
              <ul className="list-none space-y-3 mb-6 pl-2">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">–</span>
                  <span>Présentation personnelle et mon parcours. Moment d’échange avec les jeunes pour se mettre à l’aise.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">–</span>
                  <span>Enseignement théorique sur les types de fabrication de savon, explications des ingrédients requis, l’importance de la santé et sécurité, etc.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">–</span>
                  <span>Démonstration de la fabrication de savon avec la participation de ceux-ci sur une base volontaire.</span>
                </li>
              </ul>

              <div className="bg-primary/10 p-5 rounded border border-primary/20">
                <h4 className="font-bold text-foreground mb-2">*** OPTION PAYANTE ***</h4>
                <p className="font-medium text-primary mb-2">(6$+tx par SAVON de 100gr./ ÉTUDIANT)</p>
                <p>Découpe d’une grande barre de savon et distribution de ceux-ci.</p>
                <p className="text-sm italic mt-2 text-muted-foreground">Frais de déplacement en sus.</p>
              </div>
            </div>

            {/* Option 2 */}
            <div className="bg-background p-8 rounded-lg border-t-4 border-t-primary shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-2">2- Atelier participatif en équipe de +/-4 à 5 étudiants</h3>
              <p className="font-medium text-primary mb-6 text-xl">400$+tx <span className="text-sm font-normal text-muted-foreground">(environ 6 barres de 100gr. par équipe)</span></p>
              
              <p className="mb-4">
                Chaque équipe fabrique sa barre de savon de 600gr. Chaque étudiant aura 1 à 2 tâches dans la fabrication de celle-ci. 
              </p>
              
              <div className="flex flex-col gap-2 mt-6">
                <p><span className="text-primary font-bold">Durée :</span> 30 minutes</p>
                <p className="text-sm font-bold text-primary bg-primary/10 p-3 rounded mt-2 inline-block max-w-max">* Matériel de santé et sécurité fourni</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 border-t border-border bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <svg className="w-12 h-12 text-primary/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-playfair font-medium text-foreground leading-relaxed mb-8 italic">
            « C'est avec un bonheur éclatant que j'ai pris connaissance de l'offre de cours de savonnerie de Marie-Ève. Y assister avec ma fille de 13 ans a fait de ce moment une lumineuse journée, où les mystères de la saponification ont pu être levés de façon simple et légère. Son enseignement a pu être reproduit facilement à la maison par la suite! Que dire de mieux? »
          </blockquote>
          <p className="font-bold text-xl text-primary tracking-wide">— Cathy</p>
        </div>
      </section>

    </div>
  );
}
