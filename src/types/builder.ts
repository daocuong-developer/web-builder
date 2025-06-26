export interface Component {
  id: string;
  type: 'text' | 'heading' | 'image' | 'button' | 'container' | 'section' | 'form' | 'video' | 'divider' | 'spacer' | 'accordion' | 'map' | 'social' | 'grid';
  content: string;
  styles: ComponentStyles;
  children?: Component[];
}

export interface ComponentStyles {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
  display?: string;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  gap?: string;
  gridTemplateColumns?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  cursor?: string;
  boxShadow?: string;
  transition?: string;
  letterSpacing?: string;
  lineHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  overflow?: string;
  position?: string;
  zIndex?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
}

export interface Page {
  id: string;
  name: string;
  path: string;
  components: Component[];
  isHome: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Website {
  id: string;
  name: string;
  pages: Page[];
  navigation: NavigationItem[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  settings?: {
    favicon?: string;
    googleAnalytics?: string;
    metaPixel?: string;
    customDomain?: string;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  pageId: string;
  order: number;
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

export interface HistoryState {
  website: Website;
  currentPageId: string;
  selectedComponentId: string | null;
}