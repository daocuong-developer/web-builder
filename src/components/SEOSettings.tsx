import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { X, Search, Globe, Tag } from 'lucide-react';

interface SEOSettingsProps {
  onClose: () => void;
}

export function SEOSettings({ onClose }: SEOSettingsProps) {
  const { state, dispatch, getCurrentPage } = useBuilder();
  const currentPage = getCurrentPage();
  const [seoData, setSeoData] = useState({
    title: currentPage?.seoTitle || '',
    description: currentPage?.seoDescription || '',
    keywords: currentPage?.seoKeywords || '',
    favicon: state.website.settings?.favicon || '',
    googleAnalytics: state.website.settings?.googleAnalytics || '',
    metaPixel: state.website.settings?.metaPixel || ''
  });

  const handleSave = () => {
    if (currentPage) {
      dispatch({
        type: 'UPDATE_PAGE',
        payload: {
          pageId: currentPage.id,
          updates: {
            seoTitle: seoData.title,
            seoDescription: seoData.description,
            seoKeywords: seoData.keywords
          }
        }
      });
    }

    dispatch({
      type: 'SET_WEBSITE',
      payload: {
        ...state.website,
        settings: {
          ...state.website.settings,
          favicon: seoData.favicon,
          googleAnalytics: seoData.googleAnalytics,
          metaPixel: seoData.metaPixel
        }
      }
    });

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Cài đặt SEO</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Page SEO */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              SEO Trang: {currentPage?.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề SEO (Title Tag)
                </label>
                <input
                  type="text"
                  value={seoData.title}
                  onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tiêu đề trang cho SEO (50-60 ký tự)"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{seoData.title.length}/60 ký tự</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả SEO (Meta Description)
                </label>
                <textarea
                  value={seoData.description}
                  onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn gọn về trang (150-160 ký tự)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{seoData.description.length}/160 ký tự</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ khóa (Keywords)
                </label>
                <input
                  type="text"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
                />
                <p className="text-xs text-gray-500 mt-1">Phân cách bằng dấu phẩy</p>
              </div>
            </div>
          </div>

          {/* Website Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Cài đặt Website
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon URL
                </label>
                <input
                  type="url"
                  value={seoData.favicon}
                  onChange={(e) => setSeoData({ ...seoData, favicon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/favicon.ico"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={seoData.googleAnalytics}
                  onChange={(e) => setSeoData({ ...seoData, googleAnalytics: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Pixel ID
                </label>
                <input
                  type="text"
                  value={seoData.metaPixel}
                  onChange={(e) => setSeoData({ ...seoData, metaPixel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456789012345"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
}