"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function StripeCheckout({ 
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
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    if (amount <= 0) return;
    
    // Create PaymentIntent as soon as the component loads or amount changes
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, items, shippingMethod, customerDetails }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(console.error);
  }, [amount, shippingMethod]); // Re-fetch if amount or shipping method changes

  if (!clientSecret) {
    return (
      <div className="bg-card p-8 rounded-lg border border-border shadow-sm flex items-center justify-center min-h-[300px]">
         <div className="flex flex-col items-center gap-4 text-muted-foreground">
           <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
           <p>Initialisation du paiement sécurisé...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-playfair font-semibold">Paiement sécurisé</h2>
        <div className="flex gap-2 opacity-50">
           {/* Simple representation of accepted cards */}
           <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-[8px] font-bold">VISA</div>
           <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-[8px] font-bold">MC</div>
           <div className="w-8 h-5 bg-muted rounded border flex items-center justify-center text-[8px] font-bold">AMEX</div>
        </div>
      </div>
      <Elements 
        options={{ 
          clientSecret, 
          appearance: { 
            theme: 'stripe',
            variables: {
              colorPrimary: '#5c4b37', // matching the primary brown of the site
              colorBackground: '#ffffff',
              colorText: '#30313d',
              colorDanger: '#df1b41',
              fontFamily: 'Inter, system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '6px',
            }
          } 
        }} 
        stripe={stripePromise}
      >
        <CheckoutForm 
          amount={amount} 
          items={items}
          shippingMethod={shippingMethod}
          customerDetails={customerDetails}
          appliedCoupon={appliedCoupon}
        />
      </Elements>
    </div>
  );
}
