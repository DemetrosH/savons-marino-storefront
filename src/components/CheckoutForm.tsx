"use client";

import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ 
  amount, 
  items, 
  shippingMethod, 
  customerDetails,
  appliedCoupon
}: { 
  amount: number;
  items: any;
  shippingMethod: string;
  customerDetails: any;
  appliedCoupon?: any;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // We can remove the on-load useEffect since we aren't using automatic redirects.
  // We will handle the result directly in handleSubmit.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/commande-confirmee`,
      },
      redirect: "if_required", // Prevent automatic redirect to handle WC order creation
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Une erreur s'est produite");
      } else {
        setMessage("Une erreur inattendue s'est produite.");
      }
      setIsLoading(false);
      return;
    }

    // If payment succeeded, create the WooCommerce order
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Paiement réussi! Création de votre commande...");
      
      try {
        const wcResponse = await fetch("/api/create-wc-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            customerDetails,
            shippingMethod,
            total: amount,
            appliedCoupon
          }),
        });

        if (!wcResponse.ok) {
          throw new Error("Erreur de création de commande");
        }

        const wcData = await wcResponse.json();
        
        // Redirect manually to success page with intent ID and WC order ID
        window.location.href = `/commande-confirmee?payment_intent=${paymentIntent.id}&order_id=${wcData.orderId}`;
      } catch (err) {
        console.error(err);
        setMessage("Le paiement a réussi mais une erreur est survenue lors de la création de la commande. Veuillez nous contacter.");
        setIsLoading(false);
      }
    } else {
      setMessage("Le paiement est en attente de confirmation.");
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Traitement en cours...
            </div>
          ) : (
            `Payer ${amount.toFixed(2)} $`
          )}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 text-center">
          {message}
        </div>
      )}
    </form>
  );
}
