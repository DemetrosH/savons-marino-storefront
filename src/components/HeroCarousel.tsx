"use client";

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    image: 'https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5610-scaled.jpg',
    title: 'DÉCOUVREZ NOS PRODUITS',
    subtitle: 'Naturels et artisanaux, nos savons hydratants sont faits à la main minutieusement décorés de fleurs de mes jardins et parfumés aux huiles essentielles.',
    ctaText: 'Découvrir',
    ctaLink: '/boutique',
  },
  {
    id: 2,
    image: 'https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_7775-1-scaled.jpg',
    title: 'COURS DE SAVONS',
    subtitle: 'Atelier complet sur la fabrication de savons de base, où vous apprendrez les techniques de base selon le procédé à froid, sous les formes théorique et pratique.',
    ctaText: 'En savoir plus',
    ctaLink: '/cours-savons',
  },
  {
    id: 3,
    image: 'https://www.savonsmarino.ca/wp-content/uploads/2023/07/IMG_5616-scaled.jpg',
    title: 'SAVONS SUR MESURE',
    subtitle: 'Un savon à votre image?! Il est tout à fait possible de le demander...',
    ctaText: 'En savoir plus',
    ctaLink: '/sur-mesure',
  }
]

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full h-screen">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full">
          {slides.map((slide) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full" key={slide.id}>
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 tracking-wide drop-shadow-md max-w-4xl">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl font-sans max-w-2xl mb-8 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Link 
                  href={slide.ctaLink}
                  className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-primary transition-all duration-300 font-medium tracking-widest uppercase text-sm"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
