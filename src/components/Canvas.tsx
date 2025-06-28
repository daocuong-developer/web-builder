import React, { useState, useRef, useEffect } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { Component } from '../types/builder';
import { SortableCanvas } from './SortableCanvas';

export function Canvas() {
  const { state, dispatch, getCurrentPage } = useBuilder();
  const [draggedComponentType, setDraggedComponentType] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const currentPage = getCurrentPage();
  if (!currentPage) return null;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || 
          (e.target as HTMLElement).contentEditable === 'true') {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              dispatch({ type: 'REDO' });
            } else {
              dispatch({ type: 'UNDO' });
            }
            break;
          case 'y':
            e.preventDefault();
            dispatch({ type: 'REDO' });
            break;
          case 'c':
            if (state.selectedComponentId) {
              e.preventDefault();
              dispatch({ type: 'COPY_COMPONENT' });
            }
            break;
          case 'v':
            e.preventDefault();
            dispatch({ type: 'PASTE_COMPONENT', payload: { pageId: currentPage.id } });
            break;
          case 'd':
            if (state.selectedComponentId) {
              e.preventDefault();
              dispatch({ type: 'DUPLICATE_COMPONENT', payload: { pageId: currentPage.id } });
            }
            break;
        }
      }
      
      if (e.key === 'Delete' && state.selectedComponentId) {
        dispatch({ 
          type: 'DELETE_COMPONENT', 
          payload: { pageId: currentPage.id, componentId: state.selectedComponentId } 
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.selectedComponentId, currentPage.id, dispatch]);

  // Handle drop from component library
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('component-type');
    
    if (componentType) {
      const newComponent: Component = {
        id: `${componentType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: componentType as any,
        content: getDefaultContent(componentType),
        styles: getDefaultStyles(componentType),
        children: ['container', 'section', 'grid', 'accordion'].includes(componentType) ? [] : undefined
      };
      
      dispatch({
        type: 'ADD_COMPONENT',
        payload: {
          pageId: currentPage.id,
          component: newComponent
        }
      });
    }
    
    setDraggedComponentType(null);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const componentType = e.dataTransfer.getData('component-type');
    if (componentType) {
      setDraggedComponentType(componentType);
    }
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setDraggedComponentType(null);
    }
  };
  
  const getViewportClass = () => {
    switch (state.viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };
  
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="flex justify-center">
        <div className={`bg-white shadow-lg transition-all duration-300 ${getViewportClass()}`}>
          <div
            ref={canvasRef}
            className={`min-h-screen relative transition-colors ${
              draggedComponentType ? 'bg-blue-50' : ''
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => dispatch({ type: 'SET_SELECTED_COMPONENT', payload: null })}
          >
            {currentPage.components.length === 0 && !draggedComponentType && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg">Kéo thả thành phần vào đây để bắt đầu</p>
                  <p className="text-sm mt-2">Chọn từ thư viện thành phần bên trái</p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
                    <p className="font-medium">💡 Phím tắt:</p>
                    <p>• Ctrl+Z: Undo | Ctrl+Y: Redo</p>
                    <p>• Ctrl+C/V: Copy/Paste</p>
                    <p>• Ctrl+D: Duplicate | Delete: Xóa</p>
                    <p>• Kéo component để sắp xếp lại</p>
                  </div>
                </div>
              </div>
            )}
            
            {draggedComponentType && currentPage.components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-20 bg-gradient-to-r from-blue-200 to-purple-200 border-2 border-dashed border-blue-400 rounded-lg opacity-80 flex items-center justify-center">
                  <div className="text-sm text-blue-700 font-semibold px-3 py-1 bg-white rounded-full shadow-sm">
                    ⬇ Thả component ở đây ⬇
                  </div>
                </div>
              </div>
            )}
            
            {/* Sortable Canvas for existing components */}
            {currentPage.components.length > 0 && (
              <SortableCanvas 
                components={currentPage.components}
                pageId={currentPage.id}
                isDragOverCanvas={!!draggedComponentType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultContent(type: string): string {
  switch (type) {
    case 'heading':
      return 'Tiêu đề của bạn';
    case 'text':
      return 'Nội dung văn bản của bạn. Click để chỉnh sửa và tùy chỉnh văn bản này.';
    case 'button':
      return 'Click vào đây';
    case 'image':
      return 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800';
    case 'video':
      return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    case 'form':
      return 'Form liên hệ';
    case 'divider':
      return '';
    case 'spacer':
      return '';
    case 'accordion':
      return 'Tiêu đề Accordion|Nội dung chi tiết của accordion sẽ hiển thị ở đây. Bạn có thể thêm văn bản, hình ảnh hoặc bất kỳ nội dung nào khác.';
    case 'map':
      return '';
    case 'social':
      return 'Facebook|https://facebook.com,Twitter|https://twitter.com,Instagram|https://instagram.com';
    default:
      return '';
  }
}

function getDefaultStyles(type: string): any {
  const baseStyles = {
    padding: '16px',
    margin: '8px 0'
  };
  
  switch (type) {
    case 'heading':
      return {
        ...baseStyles,
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center' as const,
        color: '#1F2937'
      };
    case 'text':
      return {
        ...baseStyles,
        fontSize: '16px',
        color: '#374151',
        textAlign: 'left' as const
      };
    case 'button':
      return {
        ...baseStyles,
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        borderRadius: '8px',
        textAlign: 'center' as const,
        display: 'inline-block',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none'
      };
    case 'image':
      return {
        ...baseStyles,
        width: '100%',
        height: '300px',
        borderRadius: '8px',
        objectFit: 'cover' as const
      };
    case 'video':
      return {
        ...baseStyles,
        width: '100%',
        height: '315px',
        borderRadius: '8px'
      };
    case 'container':
      return {
        ...baseStyles,
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
      };
    case 'section':
      return {
        ...baseStyles,
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '24px'
      };
    case 'grid':
      return {
        ...baseStyles,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '24px'
      };
    case 'form':
      return {
        ...baseStyles,
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        padding: '24px'
      };
    case 'divider':
      return {
        ...baseStyles,
        height: '1px',
        backgroundColor: '#E5E7EB',
        border: 'none',
        margin: '24px 0'
      };
    case 'spacer':
      return {
        ...baseStyles,
        height: '40px',
        backgroundColor: 'transparent'
      };
    case 'accordion':
      return {
        ...baseStyles,
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        border: '1px solid #E5E7EB'
      };
    case 'map':
      return {
        ...baseStyles,
        width: '100%',
        height: '400px',
        borderRadius: '8px',
        border: 'none'
      };
    case 'social':
      return {
        ...baseStyles,
        display: 'flex',
        gap: '16px',
        justifyContent: 'center' as const,
        alignItems: 'center' as const
      };
    default:
      return baseStyles;
  }
}