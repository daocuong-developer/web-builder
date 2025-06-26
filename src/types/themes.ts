export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'portfolio' | 'business' | 'blog' | 'ecommerce' | 'restaurant';
  industry: 'technology' | 'fashion' | 'food' | 'creative' | 'corporate' | 'health' | 'education' | 'beauty' | 'retail';
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    pages: Array<{
      id: string;
      name: string;
      path: string;
      isHome: boolean;
      components: unknown[];
    }>;
    navigation: Array<{
      id: string;
      label: string;
      pageId: string;
      order: number;
    }>;
  };
}

export interface ThemeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}