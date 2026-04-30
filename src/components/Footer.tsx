import Link from "next/link";
import { Leaf, Package, Rabbit, Vegan, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const trustBadges = [
    {
      icon: (
        <img 
          src="/fleur.png" 
          alt="Fleur-de-lis" 
          className="w-8 h-8 object-contain"
        />
      ),
      text: "FABRIQUÉ AU QUÉBEC",
    },
    {
      icon: <Leaf className="w-8 h-8" strokeWidth={1.5} />,
      text: "NATUREL & BIODÉGRADABLE",
    },
    {
      icon: <Package className="w-8 h-8" strokeWidth={1.5} />,
      text: "SANS SUREMBALLAGE",
    },
    {
      icon: <Rabbit className="w-8 h-8" strokeWidth={1.5} />,
      text: "NON TESTÉ SUR LES ANIMAUX",
    },
    {
      icon: <Vegan className="w-8 h-8" strokeWidth={1.5} />,
      text: "VÉGANE",
    },
  ];

  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="bg-foreground text-background/80 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-playfair font-bold text-background tracking-wide">Savons Marino</h3>
              <p className="text-sm leading-relaxed max-w-xs">
                Savonnerie artisanale de Saint-Thuribe dans le comté de Portneuf. Nous offrons des savons naturels, hydratants et des produits de soin conçus dans le respect de l'environnement.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-background font-semibold uppercase tracking-wider text-sm mb-6">Boutique</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/boutique/categorie/savons" className="hover:text-background transition-colors">Savons à froid</Link></li>
                <li><Link href="/boutique/categorie/huiles-essentielles" className="hover:text-background transition-colors">Huiles essentielles</Link></li>
                <li><Link href="/boutique/categorie/soins_de_peau" className="hover:text-background transition-colors">Soins de la peau</Link></li>
                <li><Link href="/boutique/categorie/produits_menagers" className="hover:text-background transition-colors">Produits ménagers</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-background font-semibold uppercase tracking-wider text-sm mb-6">À propos</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/a-propos" className="hover:text-background transition-colors">Notre histoire</Link></li>
                <li><Link href="/cours-savons" className="hover:text-background transition-colors">Cours de savonnerie</Link></li>
                <li><Link href="/sur-mesure" className="hover:text-background transition-colors">Commandes sur mesure</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-background font-semibold uppercase tracking-wider text-sm mb-6">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                  <span>Saint-Thuribe<br/>Comté de Portneuf, QC</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-primary" />
                  <a href="mailto:info@savonsmarino.ca" className="hover:text-background transition-colors">info@savonsmarino.ca</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Trust Badges Banner */}
      <div className="bg-accent py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-background/90 rounded-full flex items-center justify-center text-accent-foreground shadow-sm hover:scale-105 transition-transform">
                  {badge.icon}
                </div>
                <span className="text-[10px] md:text-xs font-bold text-accent-foreground uppercase tracking-widest max-w-[120px]">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-[#111111] text-white/50 py-6 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Savons Marino. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/conditions-generales" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
