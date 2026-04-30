import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code promo manquant" }, { status: 400 });
    }

    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error("WooCommerce API keys are missing");
    }

    const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    const wcResponse = await fetch(`https://www.savonsmarino.ca/wp-json/wc/v3/coupons?code=${encodeURIComponent(code)}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${authHeader}`,
      },
    });

    if (!wcResponse.ok) {
      throw new Error("Erreur de connexion à WooCommerce");
    }

    const coupons = await wcResponse.json();

    if (coupons.length === 0) {
      return NextResponse.json({ error: "Code promo invalide" }, { status: 404 });
    }

    const coupon = coupons[0];

    // Check if coupon is expired (if date_expires is set and is in the past)
    if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
       return NextResponse.json({ error: "Ce code promo a expiré" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        amount: parseFloat(coupon.amount),
        discount_type: coupon.discount_type, // 'percent', 'fixed_cart', 'fixed_product'
        free_shipping: coupon.free_shipping,
        minimum_amount: parseFloat(coupon.minimum_amount || "0"),
        maximum_amount: parseFloat(coupon.maximum_amount || "0"),
      }
    });

  } catch (error: any) {
    console.error("Error validating coupon:", error);
    return NextResponse.json({ error: error.message || "Erreur interne" }, { status: 500 });
  }
}
