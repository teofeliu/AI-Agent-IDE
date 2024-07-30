// src/components/Droppable.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    backgroundColor: isOver ? '#e0e0e0' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}