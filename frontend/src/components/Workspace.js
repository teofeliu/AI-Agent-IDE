// src/components/Workspace.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Block from './Block';

const Workspace = ({ blocks, updateBlocks }) => {
  const [, drop] = useDrop({
    accept: 'BLOCK',
    drop: (item, monitor) => {
      const dropPosition = monitor.getClientOffset();
      handleBlockDrop(item, dropPosition);
    },
  });

  const handleBlockDrop = (item, position) => {
    const workspaceRect = document.getElementById('workspace').getBoundingClientRect();
    const relativePosition = {
      y: position.y - workspaceRect.top,
    };

    let newIndex = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (relativePosition.y > blocks[i].position.y) {
        newIndex = i + 1;
      } else {
        break;
      }
    }

    const newBlocks = [...blocks];
    if (item.index !== undefined) {
      // Move existing block
      const [movedBlock] = newBlocks.splice(item.index, 1);
      newBlocks.splice(newIndex, 0, { ...movedBlock, position: relativePosition });
    } else {
      // Add new block
      newBlocks.splice(newIndex, 0, { ...item, position: relativePosition });
    }

    // Update positions for all blocks
    newBlocks.forEach((block, index) => {
      block.position.y = index * 60; // Adjust this value based on your block height
    });

    updateBlocks(newBlocks);
  };

  return (
    <div id="workspace" ref={drop} style={{ minHeight: '400px', position: 'relative' }}>
      {blocks.map((block, index) => (
        <Block
          key={block.id}
          index={index}
          {...block}
        />
      ))}
    </div>
  );
};

export default Workspace;