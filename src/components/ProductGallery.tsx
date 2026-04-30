"use client";

import { useState, useEffect } from "react";

interface Image {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
}

interface ProductGalleryProps {
  images: Image[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState<Image>(images[0] || null);

  // Update main image if the parent changes the primary image (like when a variation is selected)
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images[0]?.id]);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden bg-muted aspect-square border border-border">
        <img 
          src="https://placehold.co/800x800?text=Savons+Marino"
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="rounded-lg overflow-hidden bg-muted aspect-square border border-border relative transition-opacity duration-300">
        <img 
          key={mainImage.id}
          src={mainImage.src}
          alt={mainImage.alt || productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setMainImage(img)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                mainImage.id === img.id ? "border-primary shadow-md" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img 
                src={img.thumbnail || img.src} 
                alt={img.alt || productName}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
