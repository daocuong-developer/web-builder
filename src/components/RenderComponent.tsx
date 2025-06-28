import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { Component } from '../types/builder';
import { Trash2, Copy, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface RenderComponentProps {
  component: Component;
  pageId: string;
  isDragging?: boolean;
}

export function RenderComponent({ component, pageId, isDragging }: RenderComponentProps) {
  const { state, dispatch } = useBuilder();
  const isSelected = state.selectedComponentId === component.id;
  const [accordionOpen, setAccordionOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_COMPONENT', payload: component.id });
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ 
      type: 'DELETE_COMPONENT', 
      payload: { pageId, componentId: component.id } 
    });
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'DUPLICATE_COMPONENT',
      payload: { pageId, componentId: component.id }
    });
  };

  const updateComponent = (updates: any) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        pageId,
        componentId: component.id,
        updates
      }
    });
  };

  // Get user's current location for maps
  const getCurrentLocationMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4609308088!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`;
        updateComponent({ content: mapUrl });
      });
    }
  };
  
  const renderContent = () => {
    const style = {
      ...component.styles,
      position: 'relative' as const,
      objectFit: component.type === 'image' ? 'cover' as const : undefined,
      opacity: isDragging ? 0.7 : 1
    };
    
    switch (component.type) {
      case 'heading':
        return (
          <h1 
            style={style} 
            className="outline-none"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (e.target.textContent !== component.content) {
                updateComponent({ content: e.target.textContent || '' });
              }
            }}
          >
            {component.content}
          </h1>
        );
      
      case 'text':
        return (
          <p 
            style={style} 
            className="outline-none"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (e.target.textContent !== component.content) {
                updateComponent({ content: e.target.textContent || '' });
              }
            }}
          >
            {component.content}
          </p>
        );
      
      case 'button':
        return (
          <button 
            style={style} 
            className="outline-none"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              if (e.target.textContent !== component.content) {
                updateComponent({ content: e.target.textContent || '' });
              }
            }}
          >
            {component.content}
          </button>
        );
      
      case 'image':
        return (
          <img 
            src={component.content} 
            alt="" 
            style={style}
            className="outline-none"
          />
        );

      case 'video':
        return (
          <iframe
            src={component.content}
            style={style}
            className="outline-none"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      case 'divider':
        return <hr style={style} className="outline-none" />;

      case 'spacer':
        return <div style={style} className="outline-none" />;

      case 'accordion': {
        const [accordionTitle, accordionContent] = component.content.split('|');
        return (
          <div style={style} className="outline-none">
            <button
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-gray-50 transition-colors"
            >
              <span
                contentEditable={isSelected}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const newTitle = e.target.textContent || accordionTitle;
                  updateComponent({ content: `${newTitle}|${accordionContent || 'Nội dung accordion'}` });
                }}
              >
                {accordionTitle || 'Tiêu đề Accordion'}
              </span>
              {accordionOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {accordionOpen && (
              <div className="p-4 border-t bg-white">
                <div
                  contentEditable={isSelected}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newContent = e.target.textContent || accordionContent;
                    updateComponent({ content: `${accordionTitle || 'Tiêu đề Accordion'}|${newContent}` });
                  }}
                  className="outline-none"
                >
                  {accordionContent || 'Nội dung accordion sẽ hiển thị ở đây. Click để chỉnh sửa.'}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'map':
        return (
          <div style={style} className="outline-none relative">
            <iframe
              src={component.content || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4609308088!2d106.69637831533315!3d10.776530192319796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3332a4d9%3A0x6d1b4c0b0b0b0b0b!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: style.borderRadius }}
              allowFullScreen
              loading="lazy"
            />
            {isSelected && (
              <button
                onClick={getCurrentLocationMap}
                className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Vị trí hiện tại
              </button>
            )}
          </div>
        );

      case 'social': {
        const socialLinks = component.content.split(',').map(item => {
          const [name, url] = item.split('|');
          return { name: name?.trim() || '', url: url?.trim() || '#' };
        });
        
        return (
          <div style={style} className="outline-none">
            {socialLinks.map((social, index) => (
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

      case 'grid':
        return (
          <div style={style} className="outline-none">
            {component.children?.map((child) => (
              <RenderComponent
                key={child.id}
                component={child}
                pageId={pageId}
              />
            ))}
            {(!component.children || component.children.length === 0) && (
              <div className="col-span-full text-gray-400 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                Kéo thả thành phần vào grid
              </div>
            )}
          </div>
        );
      
      case 'container':
      case 'section':
        return (
          <div style={style} className="outline-none min-h-[100px]">
            {component.children?.map((child) => (
              <RenderComponent
                key={child.id}
                component={child}
                pageId={pageId}
              />
            ))}
            {(!component.children || component.children.length === 0) && (
              <div className="text-gray-400 text-center py-8">
                Kéo thả thành phần vào đây
              </div>
            )}
          </div>
        );
      
      case 'form':
        return (
          <div style={style} className="outline-none">
            <h3 
              className="text-lg font-semibold mb-4"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (e.target.textContent !== component.content) {
                  updateComponent({ content: e.target.textContent || '' });
                }
              }}
            >
              {component.content}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tên của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tin nhắn
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tin nhắn của bạn"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        );
      
      default:
        return <div style={style}>{component.content}</div>;
    }
  };
  
  return (
    <div
      className={`
        relative group transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isDragging ? 'opacity-70 transform rotate-1' : ''}
      `}
      onClick={handleClick}
    >
      {renderContent()}
      
      {isSelected && !isDragging && (
        <div className="absolute -top-10 right-0 flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded-md text-xs z-20">
          <GripVertical className="w-3 h-3" />
          <span className="capitalize">{component.type}</span>
          <button
            onClick={handleDuplicate}
            className="ml-2 p-1 hover:bg-blue-700 rounded"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-blue-700 rounded"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}