// src/components/BlockMenu.js
import React from 'react';
import { useDrag } from 'react-dnd';

const BlockType = ({ type }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '10px',
        margin: '5px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
      }}
    >
      {type}
    </div>
  );
};

const BlockMenu = () => {
  const blockTypes = ['Input', 'Model', 'Output'];

  return (
    <div>
      <h3>Block Types</h3>
      {blockTypes.map((type) => (
        <BlockType key={type} type={type} />
      ))}
    </div>
  );
};

export default BlockMenu;