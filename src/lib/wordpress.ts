export interface WordPressPage {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_image?: Array<{ url: string }>;
  };
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const res = await fetch(`https://savonsmarino.ca/wp-json/wp/v2/pages?slug=${slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`);
    
    const pages: WordPressPage[] = await res.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error(`Error fetching page by slug ${slug}:`, error);
    return null;
  }
}
