// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, Search, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  // Determine if we are on the landing page
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  // Cart store helpers
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.items);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close menu and search on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Add scroll listener once
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links (shared for desktop & mobile)
  const navLinks = [
    {
      name: "Boutique",
      href: "/boutique",
      dropdown: [
        { name: "Savons", href: "/boutique/categorie/savons" },
        { name: "Soins de la peau", href: "/boutique/categorie/soins_de_peau" },
        { name: "Shampoing et revitalisant", href: "/boutique/categorie/shampoing_revitalisant" },
        { name: "Déodorants", href: "/boutique/categorie/deodorant" },
        { name: "Produits ménagers", href: "/boutique/categorie/produits_menagers" },
        { name: "Plein air", href: "/boutique/categorie/plein_air" },
        { name: "Huiles essentielles", href: "/boutique/categorie/huiles-essentielles" },
        { name: "Accessoires", href: "/boutique/categorie/accessoires" },
      ],
    },
    { name: "Cours de savon", href: "/cours-savons" },
    { name: "À propos", href: "/a-propos" },
    { name: "Sur mesure", href: "/sur-mesure" },
    { 
      name: "Nous joindre", 
      href: "/contact",
      dropdown: [
        { name: "Siège social", href: "/siege-social" },
        { name: "Contact", href: "/contact" },
      ]
    },
    { name: "Points de vente", href: "/points-de-vente" },
  ];

  // Helper classes – computed per render for readability
  const mainHeaderClass = `w-full transition-all duration-300 z-[100] relative ${
    isHome
      ? isScrolled || isMobileMenuOpen
        ? "bg-background border-b border-border shadow-md py-3"
        : "bg-transparent py-5"
      : "bg-background border-b border-border shadow-sm py-3"
  }`;

  const logoClass = `w-20 md:w-28 object-contain transition-all duration-300 ${
    isHome && !isScrolled && !isMobileMenuOpen
      ? ""
      : "brightness-0 invert-[.15] sepia-[.30] hue-rotate-[320deg] saturate-[3]"
  }`;

  const navLinkClass = `text-sm font-medium tracking-wide hover:text-primary transition-colors py-4 ${
    isHome && !isScrolled ? "text-white drop-shadow-md" : "text-foreground"
  }`;

  const iconContainerClass = `relative flex items-center gap-2 md:gap-4 z-[110] ${
    isHome && !isScrolled ? "text-white drop-shadow-md" : "text-foreground"
  }`;

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-zinc-900 text-zinc-100 py-2 px-4 text-[11px] md:text-xs font-medium tracking-wider uppercase">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6 text-center">
          <p className="hidden lg:block">
            Visitez notre page Facebook pour être à l'affût des événements à venir en 2026!
          </p>
          <span className="hidden lg:block opacity-40">|</span>
          <p>
            Les Savons Marino a maintenant sa boutique-atelier pignon sur rue à St-Casimir!
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={mainHeaderClass}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <Image 
              src="/logo-white.png" 
              alt="Savons Marino Logo" 
              width={120} 
              height={60} 
              className={logoClass}
              priority
            />
          </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
                <Link href={link.href} className={navLinkClass}>
                  <span className="flex items-center gap-1">
                    {link.name}
                    {link.dropdown && <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                  </span>
                </Link>
              {link.dropdown && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="py-2 flex flex-col">
                    {link.dropdown.map((sublink) => (
                      <Link key={sublink.name} href={sublink.href} className="px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className={iconContainerClass}>
          <button 
            aria-label="Search" 
            className={`p-2 cursor-pointer hover:text-primary transition-colors ${isSearchOpen ? 'text-primary' : ''}`}
            onClick={(e) => { e.preventDefault(); setIsSearchOpen(!isSearchOpen); }}
          >
            <Search className="w-6 h-6 md:w-5 md:h-5 pointer-events-none"/>
          </button>
          <button 
            aria-label="Cart" 
            className="p-2 cursor-pointer hover:text-primary transition-colors relative" 
            onClick={(e) => { e.preventDefault(); toggleCart(); }}
          >
            <ShoppingCart className="w-6 h-6 md:w-5 md:h-5 pointer-events-none"/>
            {mounted && cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button 
            aria-label="Menu" 
            className="p-2 cursor-pointer md:hidden hover:text-primary transition-colors" 
            onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7 pointer-events-none"/> : <Menu className="w-7 h-7 pointer-events-none"/>}
          </button>
        </div>
      </div>
      
      {/* Search Dropdown */}
      <div 
        className={`absolute top-full left-0 w-full bg-background border-b border-border shadow-md transition-all duration-300 overflow-hidden ${
          isSearchOpen ? 'max-h-24 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto flex items-center">
            <input 
              type="text" 
              placeholder="Rechercher des savons, des accessoires..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border text-foreground px-4 py-3 pr-12 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              autoFocus={isSearchOpen}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Lancer la recherche"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      </div>

    </header>

    {/* Mobile Menu Overlay - Fully Independent */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 bg-zinc-50 z-[9999] flex flex-col md:hidden overflow-y-auto pointer-events-auto">
        
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center">
            <Image 
              src="/logo-white.png" 
              alt="Savons Marino Logo" 
              width={100} 
              height={50} 
              className="brightness-0"
              priority
            />
          </Link>
          <button aria-label="Fermer le menu" onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-800 hover:text-primary transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col px-8 py-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className={`flex flex-col py-6 ${index !== navLinks.length - 1 ? 'border-b border-zinc-200' : ''}`}>
              <div className="flex items-center justify-between">
                <a 
                  href={link.href} 
                  className="text-2xl font-playfair font-semibold text-foreground hover:text-primary transition-colors block w-full py-2" 
                >
                  {link.name}
                </a>
                {link.dropdown && <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </div>
              {link.dropdown && (
                <div className="flex flex-col gap-2 mt-4 pl-4 border-l border-primary/20 ml-1">
                  {link.dropdown.map((sublink) => (
                    <a 
                      key={sublink.name} 
                      href={sublink.href} 
                      className="text-lg text-muted-foreground hover:text-primary transition-colors py-2 block w-full" 
                    >
                      {sublink.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-12 pt-8 border-t border-zinc-200 text-center mb-12">
            <p className="text-sm text-muted-foreground font-medium mb-4 uppercase tracking-wider">Suivez-nous</p>
            <div className="flex justify-center gap-8">
              <a href="https://www.facebook.com/lessavonsmarino" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">Facebook</a>
              <a href="https://www.instagram.com/lessavonsmarino" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
