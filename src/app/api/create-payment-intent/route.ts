import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10" as any, // Use the latest API version or your account's default
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items, shippingMethod, customerDetails } = body;

    // In a production environment, you should ALWAYS calculate the total securely on the server 
    // by fetching product prices from your database/WooCommerce API.
    // For this implementation, we are using the passed amount directly for simplicity,
    // but converting it to cents as Stripe requires.
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe requires the amount in smallest currency unit (cents)
      currency: "cad",
      // Optionally attach metadata about the order
      metadata: {
        shipping_method: shippingMethod,
        customer_email: customerDetails?.email || "",
      },
      // Enable automatic payment methods (Cards, Apple Pay, Google Pay based on dashboard settings)
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Error creating Stripe PaymentIntent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
