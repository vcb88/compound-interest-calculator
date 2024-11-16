
import React from 'react';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';
import './styles.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Compound Interest Calculator
        </h1>
        <CompoundInterestCalculator />
      </div>
    </div>
  );
}

export default App;
