"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { CheckCircle } from "lucide-react";

export default function CommandeConfirmeePage() {
  const { clearCart } = useCartStore();
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    // Clear the cart on successful checkout
    clearCart();
    
    // Get the payment intent ID from the URL if present
    const params = new URLSearchParams(window.location.search);
    const pi = params.get("payment_intent");
    if (pi) setPaymentIntentId(pi);
  }, [clearCart]);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-foreground">
          Merci pour votre commande !
        </h1>
        
        <p className="text-lg text-muted-foreground mb-4">
          Votre paiement a été traité avec succès.
        </p>
        
        {paymentIntentId && (
          <p className="text-sm text-muted-foreground mb-12 bg-muted p-4 rounded-md inline-block">
            Numéro de transaction : <span className="font-mono">{paymentIntentId}</span>
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link 
            href="/boutique" 
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider w-full sm:w-auto"
          >
            Continuer vos achats
          </Link>
          <Link 
            href="/" 
            className="px-8 py-3 bg-background border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors uppercase tracking-wider w-full sm:w-auto"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
