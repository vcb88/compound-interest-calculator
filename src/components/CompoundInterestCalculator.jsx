import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    const calculateInterest = () => {
      return _.range(years + 1).map(year => ({
        year,
        compoundAmount: Math.round(principal * Math.pow(1 + rate / 100, year)),
        simpleAmount: Math.round(principal * (1 + (rate / 100) * year))
      }));
    };

    setData(calculateInterest());
  }, [principal, rate, years]);

  const formatCompactNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  const formatUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Вычисляем границы значений
  const yAxisMin = Math.floor(principal * 0.9);
  const yAxisMax = Math.max(
    ...data.map(d => Math.max(d.compoundAmount, d.simpleAmount))
  );

  const calculateYAxisTicks = () => {
    const range = yAxisMax - yAxisMin;
    let step;
    
    if (range >= 1000000) {
      step = 1000000;
    } else if (range >= 100000) {
      step = 100000;
    } else if (range >= 10000) {
      step = 10000;
    } else {
      step = 1000;
    }

    const ticks = [];
    let currentTick = yAxisMin;
    
    while (currentTick <= yAxisMax) {
      ticks.push(currentTick);
      currentTick += step;
    }

    if (ticks[ticks.length - 1] < yAxisMax) {
      ticks.push(ticks[ticks.length - 1] + step);
    }

    return ticks;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Amount
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="100"
            />
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ 
                  value: 'Years', 
                  position: 'insideBottomRight',
                  offset: -10
                }}
              />
              <YAxis 
                domain={[yAxisMin, yAxisMax]}
                label={{ 
                  value: 'Amount', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: 10,
                  dy: -40
                }}
                ticks={calculateYAxisTicks()}
                tickFormatter={formatCompactNumber}
              />
              <Tooltip 
                formatter={(value, name) => [
                  formatUSD(value),
                  name === 'compoundAmount' ? 'Compound Interest' : 'Simple Interest'
                ]}
                labelFormatter={(year) => `Year ${year}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="compoundAmount"
                name="Compound Interest"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="simpleAmount"
                name="Simple Interest"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Comparison at maturity:</h3>
          {data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Compound Interest:</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatUSD(data[data.length - 1].compoundAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Simple Interest:</p>
                <p className="text-lg font-medium text-gray-900">
                  {formatUSD(data[data.length - 1].simpleAmount)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
