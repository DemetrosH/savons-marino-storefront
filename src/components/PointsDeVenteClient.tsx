"use client";

import { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";

type PointDeVente = {
  name: string;
  address: string;
  region: string;
  isHQ: boolean;
  lat?: number;
  lng?: number;
};

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.75rem",
};

// Center map near Quebec City / Trois-Rivières to show the general area
const defaultCenter = {
  lat: 46.5,
  lng: -72.0,
};

export default function PointsDeVenteClient({ pointsDeVente }: { pointsDeVente: PointDeVente[] }) {
  const [selectedRegion, setSelectedRegion] = useState<string>("Toutes les régions");
  
  const regions = useMemo(() => {
    // Extract unique regions and remove empty/invalid ones
    const allRegions = Array.from(new Set(pointsDeVente.map(p => p.region).filter(Boolean)));
    return ["Toutes les régions", ...allRegions.sort()];
  }, [pointsDeVente]);

  const filteredPoints = useMemo(() => {
    if (selectedRegion === "Toutes les régions") return pointsDeVente;
    return pointsDeVente.filter(p => p.region === selectedRegion);
  }, [pointsDeVente, selectedRegion]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Calculate center of map based on filtered points
  const center = useMemo(() => {
    const pointsWithCoords = filteredPoints.filter(p => p.lat && p.lng);
    
    // If only one region or viewing a specific set of points, average their coords
    if (pointsWithCoords.length > 0 && selectedRegion !== "Toutes les régions") {
      const sumLat = pointsWithCoords.reduce((sum, p) => sum + (p.lat || 0), 0);
      const sumLng = pointsWithCoords.reduce((sum, p) => sum + (p.lng || 0), 0);
      return {
        lat: sumLat / pointsWithCoords.length,
        lng: sumLng / pointsWithCoords.length,
      };
    }
    
    // Default zoom-out center
    return defaultCenter;
  }, [filteredPoints, selectedRegion]);

  return (
    <>
      <div className="mb-12">
        <h3 className="text-xl font-playfair font-bold mb-4">Filtrer par région</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === region
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {isLoaded ? (
        <div className="mb-16 shadow-lg rounded-xl overflow-hidden border border-border">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={selectedRegion === "Toutes les régions" ? 7 : 10}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {filteredPoints.map((point, idx) => (
              point.lat && point.lng && (
                <Marker
                  key={idx}
                  position={{ lat: point.lat, lng: point.lng }}
                  title={point.name}
                  onClick={() => {
                    // Optional: could add an InfoWindow here in the future
                  }}
                />
              )
            ))}
          </GoogleMap>
        </div>
      ) : (
        <div className="w-full h-[500px] bg-muted animate-pulse rounded-xl mb-16 flex flex-col items-center justify-center gap-4 border border-border">
          <MapPin className="w-8 h-8 text-muted-foreground/50" />
          <span className="text-muted-foreground font-medium">Chargement de la carte...</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Nos partenaires détaillants
          </h2>
          <p className="text-muted-foreground">Des boutiques locales qui partagent nos valeurs.</p>
        </div>
        <div className="flex gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>{filteredPoints.length} point{filteredPoints.length !== 1 ? 's' : ''} de vente</span>
        </div>
      </div>

      {filteredPoints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPoints.map((point, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                point.isHQ 
                  ? "bg-primary/5 border-primary/20 shadow-md ring-1 ring-primary/10" 
                  : "bg-background border-border hover:border-primary/30"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${point.isHQ ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {point.region}
                </span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">{point.name}</h4>
              <p className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
                {point.address}
              </p>
              {point.isHQ && (
                <div className="mt-4 pt-4 border-t border-primary/10">
                  <Link href="/siege-social" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                    Détails du siège social →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
          <p className="text-muted-foreground">Aucun point de vente trouvé pour cette région.</p>
        </div>
      )}
    </>
  );
}
