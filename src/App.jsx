import React from 'react';
import CompoundInterestCalculator from './components/CompoundInterestCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Compound Interest Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Compare the growth of your investment with compound vs simple interest
          </p>
        </header>
        <main>
          <CompoundInterestCalculator />
        </main>
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Built with React, Recharts, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
