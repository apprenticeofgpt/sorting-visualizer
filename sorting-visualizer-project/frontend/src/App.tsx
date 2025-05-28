import React from 'react';
import { AlgorithmProvider } from './contexts/AlgorithmContext';
import { VisualizerProvider } from './contexts/VisualizerContext';
import AlgorithmSelector from './components/AlgorithmSelector';
import Visualizer from './components/Visualizer';
import VisualizerControls from './components/VisualizerControls';
import AlgorithmInfo from './components/AlgorithmInfo';
import StepExplanation from './components/StepExplanation';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <AlgorithmProvider>
      <VisualizerProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <AlgorithmSelector />
                <AlgorithmInfo />
              </div>
              <div className="lg:col-span-3">
                <Visualizer />
                <StepExplanation />
                <VisualizerControls />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </VisualizerProvider>
    </AlgorithmProvider>
  );
};

export default App;
