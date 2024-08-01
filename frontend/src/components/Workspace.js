// frontend/src/components/Workspace.js
import React, { useEffect, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import Block from './Block';
import { getWorkspace, updateWorkspace, clearWorkspace } from '../services/api';

const Workspace = () => {
  const [blocks, setBlocks] = useState([]);

  const fetchWorkspace = useCallback(async () => {
    console.log('Fetching workspace...');
    try {
      const workspace = await getWorkspace();
      console.log('Fetched workspace:', workspace);
      setBlocks(workspace.blocks || []);
    } catch (error) {
      console.error('Error fetching workspace:', error);
    }
  }, []);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  const [, drop] = useDrop({
    accept: ['BLOCK', 'NEW_BLOCK'],
    drop: (item, monitor) => {
      const dropPosition = monitor.getClientOffset();
      handleBlockDrop(item, dropPosition);
    },
  });

  const handleBlockDrop = async (item, position) => {
    const workspaceRect = document.getElementById('workspace').getBoundingClientRect();
    const relativePosition = {
      y: position.y - workspaceRect.top,
    };

    let newIndex = blocks.length;

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].position && typeof blocks[i].position.y === 'number') {
        if (relativePosition.y < blocks[i].position.y) {
          newIndex = i;
          break;
        }
      }
    }

    const newBlocks = [...blocks];
    if (item.id) {
      // Move existing block
      const movedBlockIndex = newBlocks.findIndex(block => block.id === item.id);
      const [movedBlock] = newBlocks.splice(movedBlockIndex, 1);
      newBlocks.splice(newIndex, 0, { ...movedBlock, position: relativePosition });
    } else {
      // Add new block
      newBlocks.splice(newIndex, 0, { 
        id: Date.now().toString(), 
        type: item.type, 
        position: relativePosition,
        content: {}
      });
    }

    // Update positions for all blocks
    newBlocks.forEach((block, index) => {
      if (!block.position) {
        block.position = {};
      }
      block.position.y = index * 90; // Adjust this value based on your block height
    });

    setBlocks(newBlocks);

    try {
      await updateWorkspace(newBlocks);
    } catch (error) {
      console.error('Error updating workspace:', error);
    }
  };

  const handleClearWorkspace = async () => {
    try {
      await clearWorkspace();
      setBlocks([]);
    } catch (error) {
      console.error('Error clearing workspace:', error);
    }
  };

  useEffect(() => {
    console.log('Blocks updated:', blocks);
  }, [blocks]);

  return (
    <div>
      <button onClick={fetchWorkspace}>Refresh Workspace</button>
      <button onClick={handleClearWorkspace}>Clear Workspace</button>
      <div id="workspace" ref={drop} style={{ minHeight: '400px', position: 'relative' }}>
        {blocks.map((block) => (
          <Block
            key={block.id}
            id={block.id}
            type={block.type}
            position={block.position}
            content={block.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Workspace;