"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import StripeCheckout from "@/components/StripeCheckout";

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"flat" | "free" | "pickup">("flat");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const applyCoupon = async () => {
    if (!couponCodeInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCodeInput.trim() })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAppliedCoupon(data.coupon);
      setCouponCodeInput("");
      
      if (data.coupon.free_shipping) {
         setShippingMethod("free");
      }
    } catch (err: any) {
      setCouponError(err.message);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    if (getTotal() < 95) setShippingMethod("flat");
  };

  useEffect(() => {
    setMounted(true);
    if (getTotal() >= 95) {
      setShippingMethod("free");
    }
  }, [getTotal]);

  useEffect(() => {
    if (getTotal() < 95 && shippingMethod === "free" && !appliedCoupon?.free_shipping) {
      setShippingMethod("flat");
    }
  }, [getTotal, shippingMethod, appliedCoupon]);

  const subtotal = getTotal();
  let discountAmount = 0;

  if (appliedCoupon) {
     if (appliedCoupon.discount_type === 'percent') {
        discountAmount = subtotal * (appliedCoupon.amount / 100);
     } else if (appliedCoupon.discount_type === 'fixed_cart') {
        discountAmount = appliedCoupon.amount;
     }
  }

  discountAmount = Math.min(discountAmount, subtotal);
  const discountedSubtotal = subtotal - discountAmount;
  const shippingCost = (shippingMethod === "flat" && !appliedCoupon?.free_shipping) ? 15 : 0;
  
  const tax = (discountedSubtotal + shippingCost) * 0.14975;
  const finalTotal = discountedSubtotal + shippingCost + tax;

  const [isProcessingFreeOrder, setIsProcessingFreeOrder] = useState(false);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-playfair font-bold mb-6">Caisse</h1>
          <p className="text-muted-foreground mb-8">Vous ne pouvez pas passer à la caisse avec un panier vide.</p>
          <Link 
            href="/boutique" 
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider"
          >
            Retourner à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-12 text-foreground">
          Paiement
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Checkout Form */}
          <div className="flex flex-col gap-8">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-playfair font-semibold mb-6">Informations de contact</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    placeholder="votre@email.com" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h2 className="text-xl font-playfair font-semibold mb-6">Adresse de livraison</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Prénom</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={customerDetails.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Nom</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={customerDetails.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Adresse</label>
                  <input 
                    type="text" 
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    placeholder="Numéro et nom de rue" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Appartement, suite, etc. (optionnel)</label>
                  <input 
                    type="text" 
                    name="apartment"
                    value={customerDetails.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Ville</label>
                    <input 
                      type="text" 
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Code postal</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={customerDetails.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" 
                    />
                  </div>
                </div>
              </div>
            </div>


            {finalTotal > 0 ? (
              <StripeCheckout 
                amount={finalTotal} 
                items={items} 
                shippingMethod={shippingMethod} 
                customerDetails={customerDetails}
                appliedCoupon={appliedCoupon}
              />
            ) : (
              <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-playfair font-semibold mb-6">Validation de la commande</h2>
                <p className="text-muted-foreground mb-8">Votre commande est gratuite ! Cliquez ci-dessous pour confirmer.</p>
                <button 
                  disabled={isProcessingFreeOrder}
                  onClick={async () => {
                    // Client-side validation
                    if (!customerDetails.email || !customerDetails.firstName || !customerDetails.lastName || !customerDetails.address || !customerDetails.city || !customerDetails.postalCode) {
                      alert("Veuillez remplir tous les champs obligatoires (Email et Adresse de livraison) avant de confirmer.");
                      return;
                    }

                    setIsProcessingFreeOrder(true);
                    try {
                      const res = await fetch("/api/create-wc-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ items, customerDetails, shippingMethod, total: 0, appliedCoupon })
                      });
                      const data = await res.json();
                      if (res.ok) {
                        window.location.href = `/commande-confirmee?order_id=${data.orderId}`;
                      } else {
                        // Clean up WooCommerce HTML entities in error messages
                        const errorMessage = data.error ? data.error.replace(/&nbsp;/g, ' ') : "Une erreur est survenue";
                        alert("Erreur: " + errorMessage);
                        setIsProcessingFreeOrder(false);
                      }
                    } catch (e) {
                      alert("Erreur réseau");
                      setIsProcessingFreeOrder(false);
                    }
                  }}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider text-lg shadow-md disabled:opacity-50"
                >
                  {isProcessingFreeOrder ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Traitement en cours...
                    </div>
                  ) : (
                    "Confirmer la commande"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-muted/50 rounded-lg p-8 sticky top-32">
              <h3 className="text-lg font-playfair font-semibold mb-4">Mode de livraison</h3>
              <div className="space-y-3 mb-8">
                
                {subtotal >= 95 && (
                  <label className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${shippingMethod === 'free' ? 'border-primary bg-background shadow-sm' : 'border-border/50 bg-background/50 hover:border-primary/30'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="free" 
                        checked={shippingMethod === "free"} 
                        onChange={() => setShippingMethod("free")}
                        className="w-4 h-4 text-primary focus:ring-primary" 
                      />
                      <span className="font-medium text-sm text-foreground">Livraison gratuite</span>
                    </div>
                    <span className="font-bold text-sm text-foreground">Gratuit</span>
                  </label>
                )}

                <label className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${shippingMethod === 'flat' ? 'border-primary bg-background shadow-sm' : 'border-border/50 bg-background/50 hover:border-primary/30'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="flat" 
                      checked={shippingMethod === "flat"} 
                      onChange={() => setShippingMethod("flat")}
                      className="w-4 h-4 text-primary focus:ring-primary" 
                    />
                    <span className="font-medium text-sm text-foreground">Forfait</span>
                  </div>
                  <span className="font-medium text-sm text-foreground">15.00 $</span>
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${shippingMethod === 'pickup' ? 'border-primary bg-background shadow-sm' : 'border-border/50 bg-background/50 hover:border-primary/30'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="pickup" 
                      checked={shippingMethod === "pickup"} 
                      onChange={() => setShippingMethod("pickup")}
                      className="w-4 h-4 text-primary focus:ring-primary mt-1 self-start" 
                    />
                    <div>
                      <span className="block font-medium text-sm text-foreground">Cueillette au presbytère</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5">110, place de l'Église, St-Casimir</span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-foreground self-start mt-1">Gratuit</span>
                </label>
                
              </div>

              <h3 className="text-lg font-playfair font-semibold mb-6 pt-6 border-t border-border/50">Dans votre commande</h3>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => {
                  const price = item.prices?.price ? parseInt(item.prices.price) / 100 : 0;
                  return (
                    <div key={item.cartItemId || item.id} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border border-border">
                        <img 
                          src={item.images?.[0]?.src || 'https://placehold.co/400x400'} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="text-sm font-medium line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                        <p className="text-xs text-muted-foreground">{item.categories?.[0]?.name}</p>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="text-[10px] text-muted-foreground mt-0.5 flex flex-wrap gap-1">
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <span key={key} className="bg-muted px-1.5 py-0.5 rounded-sm">{value}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-sm">
                        {(price * item.quantity).toFixed(2)} $
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4 pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold">Code promo</h4>
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Entrez votre code" 
                      className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 uppercase"
                    />
                    <button 
                      onClick={applyCoupon}
                      disabled={isApplyingCoupon || !couponCodeInput}
                      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50"
                    >
                      {isApplyingCoupon ? "..." : "Appliquer"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{appliedCoupon.code.toUpperCase()}</span>
                      <span className="text-xs text-muted-foreground">({appliedCoupon.discount_type === 'percent' ? `-${appliedCoupon.amount}%` : `-${appliedCoupon.amount} $`})</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-destructive hover:underline font-medium">Retirer</button>
                  </div>
                )}
                {couponError && <p className="text-xs text-destructive mt-1">{couponError}</p>}
              </div>

              <div className="space-y-3 pt-6 mt-6 border-t border-border/50">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} $</span>
                </div>
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-primary font-medium">
                    <span>Rabais ({appliedCoupon.code.toUpperCase()})</span>
                    <span>-{discountAmount.toFixed(2)} $</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Expédition</span>
                  <span>
                    {shippingMethod === "free" || shippingMethod === "pickup" 
                      ? "Gratuit" 
                      : `${shippingCost.toFixed(2)} $`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes (TPS & TVQ)</span>
                  <span>{tax.toFixed(2)} $</span>
                </div>
              </div>

              <div className="border-t border-border/50 mt-6 pt-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    {finalTotal.toFixed(2)} $
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
