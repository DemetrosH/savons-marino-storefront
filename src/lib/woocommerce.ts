export interface Product {
  id: number;
  type: string;
  name: string;
  slug: string;
  permalink: string;
  short_description: string;
  description: string;
  price_html: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  attributes?: any[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
  };
  add_to_cart: {
    text: string;
    description: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent?: number;
  count?: number;
  image?: {
    id: number;
    src: string;
    thumbnail?: string;
    alt: string;
  } | null;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://savonsmarino.ca/wp-json/wc/store/products?per_page=100', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://savonsmarino.ca/wp-json/wc/store/products/categories?per_page=100', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  try {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);
    
    if (!category) return [];

    const res = await fetch(`https://savonsmarino.ca/wp-json/wc/store/products?category=${category.id}&per_page=100`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch products for category: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // The store API allows searching by slug
    const res = await fetch(`https://savonsmarino.ca/wp-json/wc/store/products?slug=${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
    
    const products = await res.json();
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const res = await fetch(`https://savonsmarino.ca/wp-json/wc/store/products?search=${encodeURIComponent(query)}&per_page=100`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) throw new Error(`Failed to search products: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function getProductVariations(productId: number): Promise<any[]> {
  try {
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    
    if (!consumerKey || !consumerSecret) {
      console.warn("Missing WC keys for fetching variations");
      return [];
    }

    const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    
    const res = await fetch(`https://savonsmarino.ca/wp-json/wc/v3/products/${productId}/variations`, {
      headers: {
        "Authorization": `Basic ${authHeader}`
      },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch variations: ${res.status}`);
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching variations:', error);
    return [];
  }
}
