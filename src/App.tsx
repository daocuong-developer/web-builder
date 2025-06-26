import React from 'react';
import { BuilderProvider, useBuilder } from './context/BuilderContext';
import { Header } from './components/Header';
import { ComponentLibrary } from './components/ComponentLibrary';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { PageManager } from './components/PageManager';
import { WelcomeScreen } from './components/WelcomeScreen';

function AppContent() {
  const { state } = useBuilder();
  
  if (state.isFirstTime) {
    return <WelcomeScreen />;
  }
  
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex flex-col">
          <ComponentLibrary />
          <PageManager />
        </div>
        
        <Canvas />
        
        <PropertyPanel />
      </div>
    </div>
  );
}

function App() {
  return (
    <BuilderProvider>
      <AppContent />
    </BuilderProvider>
  );
}

export default App;