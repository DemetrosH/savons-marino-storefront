import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customerDetails, shippingMethod, total } = body;

    // 1. Format the line items for WooCommerce
    const lineItems = items.map((item: any) => {
      const lineItem: any = {
        product_id: item.id,
        quantity: item.quantity,
      };

      if (item.variation_id) {
        lineItem.variation_id = item.variation_id;
      }

      // Add selected options as meta_data so it shows up on the order
      if (item.selectedOptions) {
        lineItem.meta_data = Object.entries(item.selectedOptions).map(([key, value]) => ({
          key: key,
          value: value
        }));
      }

      return lineItem;
    });

    // 2. Format the shipping lines
    const shippingLines = [];
    if (shippingMethod === "flat") {
      shippingLines.push({
        method_id: "flat_rate",
        method_title: "Forfait",
        total: "15.00",
      });
    } else if (shippingMethod === "free") {
      shippingLines.push({
        method_id: "free_shipping",
        method_title: "Livraison gratuite",
        total: "0.00",
      });
    } else if (shippingMethod === "pickup") {
      shippingLines.push({
        method_id: "local_pickup",
        method_title: "Cueillette au presbytère de St-Casimir",
        total: "0.00",
      });
    }

    // 3. Format the billing and shipping address
    // Splitting "firstName lastName" is simplistic, ideally they'd be separate inputs,
    // but we'll map what we have from the checkout form.
    const billing = {
      first_name: customerDetails.firstName || "",
      last_name: customerDetails.lastName || "",
      address_1: customerDetails.address || "",
      address_2: customerDetails.apartment || "",
      city: customerDetails.city || "",
      postcode: customerDetails.postalCode || "",
      country: "CA", // Assuming Canada for this shop
      email: customerDetails.email || "",
      phone: "", // Optional, we don't have this in the form currently
    };

    const orderData: any = {
      payment_method: "stripe",
      payment_method_title: "Carte de crédit (Stripe)",
      set_paid: true, // We only call this API after Stripe succeeds (or if order is totally free)
      status: "processing", // The order is paid and ready to be processed
      billing,
      shipping: billing, // Use the same address for shipping
      line_items: lineItems,
      shipping_lines: shippingLines,
    };

    if (body.appliedCoupon) {
      orderData.coupon_lines = [
        {
          code: body.appliedCoupon.code
        }
      ];
    }

    // 4. Send the request to WooCommerce REST API
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error("WooCommerce API keys are missing");
    }

    const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    const wcResponse = await fetch("https://www.savonsmarino.ca/wp-json/wc/v3/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authHeader}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!wcResponse.ok) {
      const errorData = await wcResponse.json();
      console.error("WooCommerce API Error:", errorData);
      throw new Error(errorData.message || "Failed to create order in WooCommerce");
    }

    const order = await wcResponse.json();

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("Error creating WC order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
