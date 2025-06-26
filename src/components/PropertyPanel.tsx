import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { Palette, Type, Layout, Space as Spacing, Upload, Link, MapPin, Video, FileText, Grid3X3 } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export function PropertyPanel() {
  const { dispatch, getSelectedComponent, getCurrentPage } = useBuilder();
  const selectedComponent = getSelectedComponent();
  const currentPage = getCurrentPage();
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  if (!selectedComponent || !currentPage) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold mb-2">Chưa chọn thành phần</h3>
          <p className="text-sm">Click vào một thành phần để chỉnh sửa thuộc tính</p>
        </div>
      </div>
    );
  }
  
  const updateComponent = (updates: Record<string, unknown>) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        pageId: currentPage.id,
        componentId: selectedComponent.id,
        updates
      }
    });
  };
  
  const updateStyles = (styleUpdates: Record<string, unknown>) => {
    updateComponent({
      styles: { ...selectedComponent.styles, ...styleUpdates }
    });
  };
  
  const handleImageChange = (imageUrl: string) => {
    updateComponent({ content: imageUrl });
  };

  const getComponentIcon = () => {
    switch (selectedComponent.type) {
      case 'heading': return Type;
      case 'text': return FileText;
      case 'button': return Layout;
      case 'image': return Upload;
      case 'video': return Video;
      case 'map': return MapPin;
      case 'social': return Link;
      case 'grid': return Grid3X3;
      default: return Layout;
    }
  };

  const ComponentIcon = getComponentIcon();
  
  return (
    <>
      <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ComponentIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {selectedComponent.type === 'heading' ? 'Tiêu đề' :
                 selectedComponent.type === 'text' ? 'Văn bản' :
                 selectedComponent.type === 'button' ? 'Nút bấm' :
                 selectedComponent.type === 'image' ? 'Hình ảnh' :
                 selectedComponent.type === 'video' ? 'Video' :
                 selectedComponent.type === 'map' ? 'Bản đồ' :
                 selectedComponent.type === 'social' ? 'Mạng xã hội' :
                 selectedComponent.type === 'accordion' ? 'Accordion' :
                 selectedComponent.type === 'form' ? 'Form' :
                 selectedComponent.type === 'grid' ? 'Grid Layout' :
                 selectedComponent.type}
              </h2>
            </div>
          </div>
          
          {/* Component-specific content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedComponent.type === 'image' ? 'Hình ảnh' :
               selectedComponent.type === 'video' ? 'URL Video' :
               selectedComponent.type === 'map' ? 'Bản đồ' :
               selectedComponent.type === 'social' ? 'Liên kết mạng xã hội' :
               selectedComponent.type === 'accordion' ? 'Tiêu đề & Nội dung' :
               'Nội dung'}
            </label>
            
            {selectedComponent.type === 'image' ? (
              <div className="space-y-3">
                {selectedComponent.content && (
                  <div className="relative">
                    <img 
                      src={selectedComponent.content} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <button
                  onClick={() => setShowImageUploader(true)}
                  className="flex items-center justify-center space-x-2 w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {selectedComponent.content ? 'Thay đổi hình ảnh' : 'Tải lên hình ảnh'}
                  </span>
                </button>
                <input
                  type="url"
                  value={selectedComponent.content}
                  onChange={(e) => updateComponent({ content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Hoặc nhập URL hình ảnh"
                />
              </div>
            ) : selectedComponent.type === 'video' ? (
              <div className="space-y-3">
                <input
                  type="url"
                  value={selectedComponent.content}
                  onChange={(e) => updateComponent({ content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.youtube.com/embed/..."
                />
                <p className="text-xs text-gray-500">
                  Hỗ trợ YouTube, Vimeo embed URLs
                </p>
              </div>
            ) : selectedComponent.type === 'social' ? (
              <div className="space-y-3">
                <textarea
                  value={selectedComponent.content}
                  onChange={(e) => updateComponent({ content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Facebook|https://facebook.com/yourpage,Twitter|https://twitter.com/yourhandle,Instagram|https://instagram.com/yourprofile"
                />
                <p className="text-xs text-gray-500">
                  Định dạng: Tên|URL, mỗi mạng xã hội một dòng
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-1">Ví dụ:</p>
                  <p className="text-xs text-blue-700">Facebook|https://facebook.com</p>
                  <p className="text-xs text-blue-700">Instagram|https://instagram.com</p>
                </div>
              </div>
            ) : selectedComponent.type === 'accordion' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.content.split('|')[0] || ''}
                    onChange={(e) => {
                      const content = selectedComponent.content.split('|');
                      updateComponent({ content: `${e.target.value}|${content[1] || ''}` });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Tiêu đề accordion"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nội dung
                  </label>
                  <textarea
                    value={selectedComponent.content.split('|')[1] || ''}
                    onChange={(e) => {
                      const content = selectedComponent.content.split('|');
                      updateComponent({ content: `${content[0] || ''}|${e.target.value}` });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="Nội dung chi tiết của accordion"
                  />
                </div>
              </div>
            ) : selectedComponent.type === 'map' ? (
              <div className="space-y-3">
                <input
                  type="url"
                  value={selectedComponent.content}
                  onChange={(e) => updateComponent({ content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Google Maps embed URL"
                />
                <p className="text-xs text-gray-500">
                  Lấy embed code từ Google Maps và dán URL vào đây
                </p>
              </div>
            ) : selectedComponent.type === 'grid' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Số cột
                  </label>
                  <select
                    value={selectedComponent.styles.gridTemplateColumns?.includes('repeat(2') ? '2' :
                          selectedComponent.styles.gridTemplateColumns?.includes('repeat(3') ? '3' :
                          selectedComponent.styles.gridTemplateColumns?.includes('repeat(4') ? '4' : 'auto'}
                    onChange={(e) => {
                      const cols = e.target.value === 'auto' 
                        ? 'repeat(auto-fit, minmax(250px, 1fr))'
                        : `repeat(${e.target.value}, 1fr)`;
                      updateStyles({ gridTemplateColumns: cols });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="auto">Tự động</option>
                    <option value="2">2 cột</option>
                    <option value="3">3 cột</option>
                    <option value="4">4 cột</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Khoảng cách giữa các cột
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.styles.gap || '24px'}
                    onChange={(e) => updateStyles({ gap: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="24px"
                  />
                </div>
              </div>
            ) : (
              <textarea
                value={selectedComponent.content}
                onChange={(e) => updateComponent({ content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder={getContentPlaceholder(selectedComponent.type)}
              />
            )}
          </div>
          
          {/* Typography - only for text-based components */}
          {['heading', 'text', 'button'].includes(selectedComponent.type) && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Type className="w-4 h-4 text-gray-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-900">Kiểu chữ</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Cỡ chữ
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.styles.fontSize || '16px'}
                    onChange={(e) => updateStyles({ fontSize: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="16px"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Độ đậm
                  </label>
                  <select
                    value={selectedComponent.styles.fontWeight || 'normal'}
                    onChange={(e) => updateStyles({ fontWeight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="normal">Bình thường</option>
                    <option value="500">Vừa</option>
                    <option value="600">Đậm vừa</option>
                    <option value="bold">Đậm</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Căn chỉnh
                  </label>
                  <select
                    value={selectedComponent.styles.textAlign || 'left'}
                    onChange={(e) => updateStyles({ textAlign: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="left">Trái</option>
                    <option value="center">Giữa</option>
                    <option value="right">Phải</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Colors */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Palette className="w-4 h-4 text-gray-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
            </div>
            
            <div className="space-y-3">
              {selectedComponent.type !== 'divider' && selectedComponent.type !== 'spacer' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Màu chữ
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={selectedComponent.styles.color || '#000000'}
                      onChange={(e) => updateStyles({ color: e.target.value })}
                      className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedComponent.styles.color || '#000000'}
                      onChange={(e) => updateStyles({ color: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Màu nền
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={selectedComponent.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                    className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedComponent.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Spacing */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Spacing className="w-4 h-4 text-gray-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Khoảng cách</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Padding (trong)
                </label>
                <input
                  type="text"
                  value={selectedComponent.styles.padding || '16px'}
                  onChange={(e) => updateStyles({ padding: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="16px"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Margin (ngoài)
                </label>
                <input
                  type="text"
                  value={selectedComponent.styles.margin || '8px 0'}
                  onChange={(e) => updateStyles({ margin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="8px 0"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Bo góc
                </label>
                <input
                  type="text"
                  value={selectedComponent.styles.borderRadius || '0px'}
                  onChange={(e) => updateStyles({ borderRadius: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="8px"
                />
              </div>
            </div>
          </div>
          
          {/* Component-specific properties */}
          {(selectedComponent.type === 'image' || selectedComponent.type === 'video') && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Thuộc tính {selectedComponent.type === 'image' ? 'hình ảnh' : 'video'}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Chiều rộng
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.styles.width || '100%'}
                    onChange={(e) => updateStyles({ width: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="100%"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Chiều cao
                  </label>
                  <input
                    type="text"
                    value={selectedComponent.styles.height || (selectedComponent.type === 'image' ? '300px' : '315px')}
                    onChange={(e) => updateStyles({ height: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder={selectedComponent.type === 'image' ? '300px' : '315px'}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showImageUploader && (
        <ImageUploader
          currentImage={selectedComponent.content}
          onImageChange={handleImageChange}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </>
  );
}

function getContentPlaceholder(type: string): string {
  switch (type) {
    case 'heading':
      return 'Nhập tiêu đề của bạn...';
    case 'text':
      return 'Nhập nội dung văn bản...';
    case 'button':
      return 'Nhập text cho nút...';
    case 'form':
      return 'Nhập tiêu đề form...';
    default:
      return 'Nhập nội dung...';
  }
}