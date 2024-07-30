// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlockMenu from './components/BlockMenu';
import Workspace from './components/Workspace';

function App() {
  const [blocks, setBlocks] = useState([]);

  const updateBlocks = (newBlocks) => {
    setBlocks(newBlocks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BlockMenu />
        <Workspace blocks={blocks} updateBlocks={updateBlocks} />
      </div>
    </DndProvider>
  );
}

export default App;