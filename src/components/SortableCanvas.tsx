import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useBuilder } from '../context/BuilderContext';
import { Component } from '../types/builder';
import { SortableItem } from './SortableItem';
import { RenderComponent } from './RenderComponent';

interface SortableCanvasProps {
  components: Component[];
  pageId: string;
  isDragOverCanvas?: boolean;
}

export function SortableCanvas({ components, pageId, isDragOverCanvas }: SortableCanvasProps) {
  const { dispatch } = useBuilder();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = React.useState<Component | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    // Find the dragged component
    const component = components.find(c => c.id === active.id);
    setDraggedComponent(component || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = components.findIndex(c => c.id === active.id);
      const newIndex = components.findIndex(c => c.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Use the reorder action from context
        dispatch({
          type: 'REORDER_COMPONENT',
          payload: {
            pageId,
            componentId: active.id as string,
            newIndex
          }
        });
      }
    }

    setActiveId(null);
    setDraggedComponent(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className={`space-y-2 ${isDragOverCanvas ? 'bg-blue-50/50' : ''}`}>
          {components.map((component) => (
            <SortableItem
              key={component.id}
              id={component.id}
              component={component}
              pageId={pageId}
              isDragging={activeId === component.id}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && draggedComponent ? (
          <div className="opacity-80 transform rotate-2 shadow-2xl">
            <RenderComponent
              component={draggedComponent}
              pageId={pageId}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}