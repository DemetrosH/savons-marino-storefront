import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export default function SiegeSocialPage() {
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
            Siège social
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mb-8 italic">
            "S’entraider sous un même toit, une équipe de rêve, notre souci à tous; la santé et la satisfaction de nos clients."
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              L'ancien presbytère
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                L’ancien presbytère de Saint-Casimir est maintenant un espace de santé regroupant une équipe multidisciplinaire ayant votre santé et mieux-être en priorité.
              </p>
              <p>
                L’atelier de savonnerie est installé dans ce même espace. Vous pouvez magasiner les savons Marino directement dans la salle d’attente, en vente libre. Comme quoi la confiance règne!
              </p>
              <p>
                Il est toutefois possible de prendre rendez-vous pour un accompagnement plus personnalisé lors de votre magasinage de savons, par téléphone, courriel ou Messenger.
              </p>
              <p className="font-medium text-primary">
                Nous vous invitons à consulter les heures d’ouverture avant de vous déplacer.
              </p>
            </div>

            {/* Contact Quick Links */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Adresse</h4>
                  <p className="text-muted-foreground text-sm">110, place de l’Église<br />Saint-Casimir, QC G0A 3L0</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Téléphone</h4>
                  <p className="text-muted-foreground text-sm">+1 (418) 930-6777</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Email</h4>
                  <p className="text-muted-foreground text-sm">savonsmarino@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Messenger</h4>
                  <p className="text-muted-foreground text-sm">@lessavonsmarino</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden border border-border shadow-2xl group">
             <img 
              src="https://www.savonsmarino.ca/wp-content/uploads/2023/08/IMG_5948.webp" 
              alt="L'ancien presbytère - Siège social Savons Marino"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="bg-muted/30 py-24 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Heures d'ouverture
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Boutique Atelier */}
            <div className="bg-background p-8 md:p-10 rounded-2xl shadow-sm border border-border flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-playfair font-bold">Boutique-atelier</h3>
              </div>
              
              <ul className="space-y-4 flex-grow">
                {[
                  { day: "Lundi - Mardi", hours: "Fermé ou sur appel", note: "Je suis soit présente (en production) ou absente (en livraison)." },
                  { day: "Mercredi - Jeudi", hours: "10h - 16h" },
                  { day: "Vendredi", hours: "10h - 16h" },
                  { day: "Samedi", hours: "Basse saison : Fermé | Haute saison : 10h - 16h", isSpecial: true },
                  { day: "Dimanche", hours: "Congé" },
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{item.day}</span>
                      <span className={`text-sm ${item.hours === 'Congé' || item.hours.startsWith('Fermé') ? 'text-muted-foreground' : 'text-primary font-semibold'}`}>
                        {item.hours}
                      </span>
                    </div>
                    {item.note && <p className="text-xs text-muted-foreground mt-1 italic">{item.note}</p>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Libre-service */}
            <div className="bg-background p-8 md:p-10 rounded-2xl shadow-sm border border-border flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-playfair font-bold">Section Libre-service</h3>
              </div>
              
              <ul className="space-y-4 flex-grow">
                {[
                  { day: "Lundi - Mardi", hours: "8h - 20h" },
                  { day: "Mercredi", hours: "11h - 18h" },
                  { day: "Jeudi", hours: "12h - 20h" },
                  { day: "Vendredi", hours: "8h - 17h" },
                  { day: "Samedi", hours: "10h - 16h*", note: "*Haute saison : 1er juin au 1er octobre" },
                  { day: "Dimanche", hours: "Congé" },
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{item.day}</span>
                      <span className={`text-sm ${item.hours === 'Congé' ? 'text-muted-foreground' : 'text-primary font-semibold'}`}>
                        {item.hours}
                      </span>
                    </div>
                    {item.note && <p className="text-xs text-muted-foreground mt-1 italic">{item.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Map */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Social Media */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-playfair font-bold mb-6">Suivez-nous</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Rejoignez notre communauté sur les réseaux sociaux pour découvrir les coulisses de l'atelier et nos nouveautés.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/lessavonsmarino" target="_blank" rel="noopener noreferrer" className="bg-muted hover:bg-primary hover:text-white p-4 rounded-xl transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/les_savons_marino/" target="_blank" rel="noopener noreferrer" className="bg-muted hover:bg-primary hover:text-white p-4 rounded-xl transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2 relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border">
              {/* Iframe for Google Maps */}
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src="https://maps.google.com/maps?q=110%20place%20de%20l'Eglise,%20Saint-Casimir,%20QC%20G0A%203L0&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
              ></iframe>
              {/* Overlay in case API key is missing or for aesthetic */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-md border border-border max-w-xs">
                <p className="text-sm font-semibold">110, place de l'Église</p>
                <p className="text-xs text-muted-foreground">Saint-Casimir, QC G0A 3L0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-24 border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-playfair font-bold mb-6">Prêt à nous rendre visite?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Venez découvrir notre atelier et nos produits artisanaux directement à la source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/boutique"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm shadow-md"
            >
              Voir la boutique
            </Link>
            <a 
              href="tel:+14189306777"
              className="inline-block px-8 py-4 bg-white text-foreground border border-border font-semibold rounded-md hover:bg-muted transition-colors uppercase tracking-wider text-sm shadow-sm"
            >
              Nous appeler
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
