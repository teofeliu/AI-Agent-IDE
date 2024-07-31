
// frontend/src/App.js
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlockMenu from './components/BlockMenu';
import Workspace from './components/Workspace';
import AgentCreator from './components/AgentCreator';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAgentCreated = useCallback(() => {
    console.log('Agent created, triggering workspace refresh');
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BlockMenu />
        <AgentCreator onAgentCreated={handleAgentCreated} />
        <Workspace key={refreshTrigger} />
      </div>
    </DndProvider>
  );
}

export default App;