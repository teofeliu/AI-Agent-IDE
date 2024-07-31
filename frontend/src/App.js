import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlockMenu from './components/BlockMenu';
import Workspace from './components/Workspace';
import AgentCreator from './components/AgentCreator';

function App() {
  const handleAgentCreated = () => {
    // You might want to refresh the workspace or show a success message
    console.log('Agent created successfully');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BlockMenu />
        <AgentCreator onAgentCreated={handleAgentCreated} />
        <Workspace />
      </div>
    </DndProvider>
  );
}

export default App;