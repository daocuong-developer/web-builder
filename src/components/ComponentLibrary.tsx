import React from 'react';
import { 
  Type, 
  Heading1, 
  Image, 
  Square, 
  Layout, 
  MousePointer, 
  Mail,
  Video,
  MapPin,
  Share2,
  Minus,
  Space,
  ChevronDown,
  Grid3X3
} from 'lucide-react';

const components = [
  {
    type: 'heading',
    name: 'Tiêu đề',
    icon: Heading1,
    description: 'Thêm tiêu đề hoặc heading'
  },
  {
    type: 'text',
    name: 'Văn bản',
    icon: Type,
    description: 'Thêm đoạn văn bản'
  },
  {
    type: 'button',
    name: 'Nút bấm',
    icon: MousePointer,
    description: 'Thêm nút có thể click'
  },
  {
    type: 'image',
    name: 'Hình ảnh',
    icon: Image,
    description: 'Thêm hình ảnh từ máy tính hoặc URL'
  },
  {
    type: 'video',
    name: 'Video',
    icon: Video,
    description: 'Thêm video YouTube/Vimeo'
  },
  {
    type: 'form',
    name: 'Form liên hệ',
    icon: Mail,
    description: 'Thêm form liên hệ'
  },
  {
    type: 'container',
    name: 'Container',
    icon: Square,
    description: 'Thêm khung chứa các thành phần khác'
  },
  {
    type: 'section',
    name: 'Section',
    icon: Layout,
    description: 'Thêm một phần của trang'
  },
  {
    type: 'grid',
    name: 'Grid Layout',
    icon: Grid3X3,
    description: 'Thêm layout dạng lưới'
  },
  {
    type: 'divider',
    name: 'Đường phân cách',
    icon: Minus,
    description: 'Thêm đường kẻ phân cách'
  },
  {
    type: 'spacer',
    name: 'Khoảng trống',
    icon: Space,
    description: 'Thêm khoảng trống'
  },
  {
    type: 'accordion',
    name: 'Accordion',
    icon: ChevronDown,
    description: 'Thêm accordion thu gọn/mở rộng'
  },
  {
    type: 'map',
    name: 'Bản đồ',
    icon: MapPin,
    description: 'Thêm Google Maps'
  },
  {
    type: 'social',
    name: 'Mạng xã hội',
    icon: Share2,
    description: 'Thêm link mạng xã hội'
  }
];

export function ComponentLibrary() {
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('component-type', componentType);
  };
  
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thư viện thành phần
        </h2>
        
        <div className="space-y-2">
          {components.map((component) => {
            const Icon = component.icon;
            
            return (
              <div
                key={component.type}
                draggable
                onDragStart={(e) => handleDragStart(e, component.type)}
                className="flex items-center p-3 border border-gray-200 rounded-lg cursor-grab hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {component.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {component.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Hướng dẫn sử dụng
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Kéo thả thành phần vào canvas</li>
            <li>• Click để chọn và chỉnh sửa</li>
            <li>• Sử dụng panel bên phải để tùy chỉnh</li>
            <li>• Hình ảnh có thể upload từ máy tính</li>
            <li>• Ctrl+Z để undo, Ctrl+Y để redo</li>
            <li>• Ctrl+C/V để copy/paste</li>
          </ul>
        </div>
      </div>
    </div>
  );
}