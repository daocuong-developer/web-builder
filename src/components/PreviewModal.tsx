import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { X, ExternalLink } from 'lucide-react';

interface PreviewModalProps {
  onClose: () => void;
}

export function PreviewModal({ onClose }: PreviewModalProps) {
  const { state } = useBuilder();
  const [currentPreviewPageId, setCurrentPreviewPageId] = useState(state.currentPageId);
  
  const currentPage = state.website.pages.find(p => p.id === currentPreviewPageId);
  
  if (!currentPage) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePageNavigation = (pageId: string) => {
    setCurrentPreviewPageId(pageId);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Preview: {currentPage.name}
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <div className="bg-white shadow-lg mx-auto max-w-4xl">
            <div className="min-h-[600px]">
              {/* Navigation */}
              {state.website.navigation.length > 1 && (
                <nav className="bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      {state.website.name}
                    </div>
                    <div className="flex items-center space-x-6">
                      {state.website.navigation.map((nav) => {
                        return (
                          <button
                            key={nav.id}
                            onClick={() => handlePageNavigation(nav.pageId)}
                            className={`text-sm font-medium transition-colors cursor-pointer ${
                              nav.pageId === currentPreviewPageId
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {nav.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </nav>
              )}
              
              {/* Page Content */}
              <div className="p-6">
                {currentPage.components.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-lg">Trang này đang trống</p>
                    <p className="text-sm mt-2">Thêm một số component để xem chúng ở đây</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {currentPage.components.map((component) => (
                      <PreviewComponent key={component.id} component={component} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreviewComponentType {
  id: string;
  type: string;
  content?: string;
  styles?: React.CSSProperties & { position?: string };
  children?: PreviewComponentType[];
}

function PreviewComponent({ component }: { component: PreviewComponentType }) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const style = { ...component.styles };
  
  switch (component.type) {
    case 'heading':
      return <h1 style={style}>{component.content}</h1>;
    
    case 'text':
      return <p style={style}>{component.content}</p>;
    
    case 'button':
      return <button style={style}>{component.content}</button>;
    
    case 'image':
      return <img src={component.content} alt="" style={style} />;

    case 'video':
      return (
        <iframe
          src={component.content}
          style={style}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );

    case 'divider':
      return <hr style={style} />;

    case 'spacer':
      return <div style={style} />;

    case 'accordion': {
      const [accordionTitle, accordionContent] = (component.content ?? '').split('|');
      return (
        <div style={style}>
          <button
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50 transition-colors"
          >
            <span>{accordionTitle || 'Accordion Title'}</span>
            <span>{accordionOpen ? '−' : '+'}</span>
          </button>
          {accordionOpen && (
            <div className="p-4 border-t bg-white">
              {accordionContent || 'Accordion content goes here'}
            </div>
          )}
        </div>
      );
    }

    case 'map':
      return (
        <iframe
          src={component.content || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4609308088!2d106.69637831533315!3d10.776530192319796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3332a4d9%3A0x6d1b4c0b0b0b0b0b!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
          style={style}
          frameBorder="0"
          allowFullScreen
        />
      );

    case 'social': {
      const socialLinks = (component.content ?? '').split(',').map((item: string) => {
        const [name, url] = item.split('|');
        return { name: name?.trim() || '', url: url?.trim() || '#' };
      });
      
      return (
        <div style={style}>
          {socialLinks.map((social: { name: string; url: string }, index: number) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mr-3 mb-2"
              title={social.name}
            >
              {social.name.charAt(0).toUpperCase()}
            </a>
          ))}
        </div>
      );
    }
    
    case 'container':
    case 'section':
    case 'grid':
      return (
        <div style={style}>
          {component.children?.map((child: PreviewComponentType) => (
            <PreviewComponent key={child.id} component={child} />
          ))}
          {(!component.children || component.children.length === 0) && (
            <div className="text-gray-400 text-center py-8">
              Container trống
            </div>
          )}
        </div>
      );
    
    case 'form':
      return (
        <div style={style}>
          <h3 className="text-lg font-semibold mb-4">{component.content}</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Tên" className="w-full px-3 py-2 border rounded-md" />
            <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md" />
            <textarea placeholder="Tin nhắn" rows={4} className="w-full px-3 py-2 border rounded-md" />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      );
    
    default:
      return <div style={style}>{component.content}</div>;
  }
}