import React, { useState } from 'react';
import { themes, themeCategories } from '../data/themes';
import { Theme } from '../types/theme';
import { X, Eye, Palette, Sparkles, Filter } from 'lucide-react';

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme | null) => void;
  onClose: () => void;
}

export function ThemeSelector({ onSelectTheme, onClose }: ThemeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const filteredThemes = selectedCategory === 'all' 
    ? themes 
    : themes.filter(theme => theme.category === selectedCategory);

  const handleSelectTheme = (theme: Theme) => {
    onSelectTheme(theme);
    onClose();
  };

  const handleStartBlank = () => {
    onSelectTheme(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Chọn Theme</h2>
              <p className="text-sm text-gray-600">Bắt đầu với một template đẹp hoặc tạo từ đầu</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Categories */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">🎯</span>
                <div>
                  <div className="font-medium">Tất cả</div>
                  <div className="text-xs text-gray-500">{themes.length} themes</div>
                </div>
              </button>

              {themeCategories.map((category) => {
                const count = themes.filter(t => t.category === category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">{count} themes</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Start Blank Option */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleStartBlank}
                className="w-full flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Tạo từ trắng</div>
                  <div className="text-xs">Bắt đầu với trang trống</div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Content - Theme Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'Tất cả Themes' : 
                   themeCategories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Filter className="w-4 h-4" />
                  <span>{filteredThemes.length} themes</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300"
                >
                  {/* Theme Preview Image */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={theme.thumbnail}
                      alt={theme.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <button
                          onClick={() => setPreviewTheme(theme)}
                          className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Xem trước</span>
                        </button>
                        <button
                          onClick={() => handleSelectTheme(theme)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <span>Chọn</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                      <div className="flex items-center space-x-1">
                        {Object.values(theme.colors).slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {themeCategories.find(c => c.id === theme.category)?.name}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleSelectTheme(theme)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sử dụng →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredThemes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy theme
                </h3>
                <p className="text-gray-600">
                  Thử chọn danh mục khác hoặc bắt đầu với trang trắng
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTheme && (
        <ThemePreviewModal
          theme={previewTheme}
          onClose={() => setPreviewTheme(null)}
          onSelect={() => handleSelectTheme(previewTheme)}
        />
      )}
    </div>
  );
}

function ThemePreviewModal({ theme, onClose, onSelect }: {
  theme: Theme;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{theme.name}</h3>
            <p className="text-sm text-gray-600">{theme.description}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onSelect}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Chọn theme này
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-4 bg-gray-50 overflow-auto">
          <div className="bg-white shadow-lg mx-auto max-w-4xl rounded-lg overflow-hidden">
            <img
              src={theme.thumbnail}
              alt={`${theme.name} preview`}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}