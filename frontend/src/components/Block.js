// src/components/Block.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ id, type, position, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id, type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Default position if not provided
  const blockPosition = position || { y: 0 };

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        top: blockPosition.y,
        left: 0,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: '#f0f0f0',
        padding: '10px',
        margin: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'move',
      }}
    >
      {type}
    </div>
  );
};

export default Block;