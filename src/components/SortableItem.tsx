import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Component } from '../types/builder';
import { RenderComponent } from './RenderComponent';

interface SortableItemProps {
  id: string;
  component: Component;
  pageId: string;
  isDragging?: boolean;
}

export function SortableItem({ id, component, pageId, isDragging }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group
        ${isSortableDragging ? 'z-50' : ''}
        ${isDragging ? 'opacity-50' : ''}
      `}
      {...attributes}
    >
      {/* Drag Handle - Invisible overlay for better UX */}
      <div
        {...listeners}
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing opacity-0 hover:opacity-100 bg-blue-500/10 border-2 border-dashed border-blue-400 rounded-lg transition-opacity duration-200"
        style={{ pointerEvents: isSortableDragging ? 'none' : 'auto' }}
      >
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          ⋮⋮ Kéo để di chuyển
        </div>
      </div>

      {/* Component Content */}
      <div className={`
        relative
        ${isSortableDragging ? 'pointer-events-none' : ''}
      `}>
        <RenderComponent
          component={component}
          pageId={pageId}
          isDragging={isSortableDragging}
        />
      </div>

      {/* Drop Indicator */}
      {isSortableDragging && (
        <div className="absolute inset-0 bg-blue-200/30 border-2 border-blue-400 border-dashed rounded-lg pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Đang di chuyển...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}