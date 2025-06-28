import React from 'react';

export function DropZone() {
  return (
    <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 border-2 border-dashed border-blue-400 rounded-lg opacity-80 my-2 flex items-center justify-center transition-all duration-200 hover:opacity-100">
      <div className="text-xs text-blue-700 font-semibold px-3 py-1 bg-white rounded-full shadow-sm">
        ⬇ Thả component ở đây ⬇
      </div>
    </div>
  );
}