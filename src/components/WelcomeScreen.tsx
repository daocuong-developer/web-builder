import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { Theme } from '../types/theme';
import { ThemeSelector } from './ThemeSelector';
import { Sparkles, Palette, Zap, Users } from 'lucide-react';

export function WelcomeScreen() {
  const { dispatch } = useBuilder();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleSelectTheme = (theme: Theme | null) => {
    if (theme) {
      // Apply theme to website
      const newWebsite = {
        id: 'user-website',
        name: theme.name,
        pages: theme.layout.pages,
        navigation: theme.layout.navigation,
        theme: {
          primaryColor: theme.colors.primary,
          secondaryColor: theme.colors.secondary,
          backgroundColor: theme.colors.background,
          textColor: theme.colors.text
        }
      };
      
      dispatch({ type: 'SET_WEBSITE', payload: newWebsite });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: theme.layout.pages[0].id });
    } else {
      // Start with blank template
      const blankWebsite = {
        id: 'user-website',
        name: 'Website của tôi',
        pages: [
          {
            id: 'home',
            name: 'Trang chủ',
            path: '/',
            isHome: true,
            components: []
          }
        ],
        navigation: [
          {
            id: 'nav-home',
            label: 'Trang chủ',
            pageId: 'home',
            order: 0
          }
        ],
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#14B8A6',
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937'
        }
      };
      
      dispatch({ type: 'SET_WEBSITE', payload: blankWebsite });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 'home' });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Chào mừng đến với
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Website Builder</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tạo website chuyên nghiệp chỉ trong vài phút với công cụ kéo-thả trực quan. 
              Không cần biết lập trình!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setShowThemeSelector(true)}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Palette className="w-5 h-5" />
                <span className="font-semibold">Chọn Theme & Bắt đầu</span>
              </button>
              
              <button
                onClick={() => handleSelectTheme(null)}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Tạo từ trang trắng</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kéo-thả dễ dàng</h3>
              <p className="text-gray-600 text-sm">
                Thêm và sắp xếp các thành phần chỉ bằng cách kéo-thả. Không cần code!
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Theme đa dạng</h3>
              <p className="text-gray-600 text-sm">
                Hàng chục theme đẹp mắt cho mọi ngành nghề và mục đích sử dụng.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Xuất bản nhanh</h3>
              <p className="text-gray-600 text-sm">
                Preview và xuất bản website của bạn chỉ với một cú click.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">10+</div>
              <div className="text-sm text-gray-600">Theme đẹp</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Responsive</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Code cần thiết</div>
            </div>
          </div>
        </div>
      </div>

      {showThemeSelector && (
        <ThemeSelector
          onSelectTheme={handleSelectTheme}
          onClose={() => setShowThemeSelector(false)}
        />
      )}
    </>
  );
}