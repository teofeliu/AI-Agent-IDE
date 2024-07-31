// frontend/src/components/Block.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ id, type, position, content }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const blockPosition = position || { y: 0 };

  const renderContent = () => {
    switch (type) {
      case 'Model':
        return (
          <>
            <div>Type: Model</div>
            <div>Company: {content.company || 'Unknown'}</div>
            <div>Name: {content.name || 'Unknown'}</div>
          </>
        );
      case 'Input':
      case 'Output':
        return (
          <>
            <div>Type: {type}</div>
            <div>Content: {content.content}</div>
          </>
        );
      default:
        return <div>Type: {type}</div>;
    }
  };

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
        width: '200px',  // Add a fixed width for better layout
      }}
    >
      {renderContent()}
    </div>
  );
};

export default Block;