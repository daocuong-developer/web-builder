import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Download, 
  Settings,
  Play,
  Palette,
  Search,
  Undo,
  Redo
} from 'lucide-react';
import { PreviewModal } from './PreviewModal';
import { ThemeSelector } from './ThemeSelector';
import { SEOSettings } from './SEOSettings';
// Page type for theme layout
interface ThemeLayoutPage {
  id: string;
  name: string;
  components: unknown[];
  path?: string;
  isHome?: boolean;
}

// Theme type definition (replace with your actual structure if needed)
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  layout: {
    pages: ThemeLayoutPage[];
    navigation?: unknown;
  };
}

export function Header() {
  const { state, dispatch } = useBuilder();
  const [showPreview, setShowPreview] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showSEOSettings, setShowSEOSettings] = useState(false);
  
  const viewModeButtons = [
    { mode: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { mode: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { mode: 'mobile' as const, icon: Smartphone, label: 'Mobile' }
  ];
  
  const handleExport = () => {
    // Generate HTML export
    const currentPage = state.website.pages.find(p => p.id === state.currentPageId);
    if (!currentPage) return;
    
    const html = generateHTML(currentPage, state.website);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.website.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  // Add this function to handle theme selection
  function handleSelectTheme(theme: Theme) {
    dispatch({ type: 'SET_THEME', payload: theme });
    setShowThemeSelector(false);
  }
  
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Website Builder
              </h1>
            </div>
            
            <div className="text-sm text-gray-500">
              Editing: <span className="text-gray-900 font-medium">{state.website.name}</span>
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => dispatch({ type: 'UNDO' })}
                disabled={!canUndo}
                className={`p-2 rounded-lg transition-colors ${
                  canUndo 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch({ type: 'REDO' })}
                disabled={!canRedo}
                className={`p-2 rounded-lg transition-colors ${
                  canRedo 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {viewModeButtons.map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: mode })}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    state.viewMode === mode
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowThemeSelector(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Palette className="w-4 h-4" />
                <span>Themes</span>
              </button>

              <button
                onClick={() => setShowSEOSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>SEO</span>
              </button>

              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Play className="w-4 h-4" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} />
      )}

      {showThemeSelector && (
        <ThemeSelector
          onSelectTheme={handleSelectTheme}
          onClose={() => setShowThemeSelector(false)}
        />
      )}

      {showSEOSettings && (
        <SEOSettings onClose={() => setShowSEOSettings(false)} />
      )}
    </>
  );
}

interface Page {
  id: string;
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  components: unknown[]; // Replace 'unknown' with a more specific type if available
}

interface Website {
  name: string;
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
  };
  pages: Page[];
  navigation?: unknown; // Replace 'unknown' with a more specific type if available
}

function generateHTML(page: Page, website: Website): string {
  const seoTitle = page.seoTitle || `${website.name} - ${page.name}`;
  const seoDescription = page.seoDescription || `${page.name} page of ${website.name}`;
  const favicon = website.settings?.favicon || '';
  const googleAnalytics = website.settings?.googleAnalytics || '';
  const metaPixel = website.settings?.metaPixel || '';

  return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDescription}">
    ${page.seoKeywords ? `<meta name="keywords" content="${page.seoKeywords}">` : ''}
    ${favicon ? `<link rel="icon" href="${favicon}">` : ''}
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            background-color: ${website.theme.backgroundColor};
            color: ${website.theme.textColor};
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .responsive { width: 100%; height: auto; }
        @media (max-width: 768px) {
            .container { padding: 0 16px; }
        }
    </style>
    
    ${googleAnalytics ? `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalytics}');
    </script>
    ` : ''}
    
    ${metaPixel ? `
    <!-- Meta Pixel -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixel}');
        fbq('track', 'PageView');
    </script>
    ` : ''}
</head>
<body>
    <div class="container">
        <h1>Generated Website: ${page.name}</h1>
        <p>Website: ${website.name}</p>
        <p>Components: ${page.components.length}</p>
        <p>Theme: Primary Color ${website.theme.primaryColor}</p>
    </div>
</body>
</html>
  `;
}