import React, { useEffect, useState } from 'react';
import { Brain, Zap, Target } from 'lucide-react';

export const AIVisualization: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNodes = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9));
      setActiveNodes(randomNodes);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
      {/* Neural Network Visualization */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-1000 ${
              activeNodes.includes(index)
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-150 shadow-lg shadow-purple-400/50'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
        {Array.from({ length: 6 }).map((_, index) => (
          <line
            key={index}
            x1={50 + (index % 3) * 100}
            y1={80}
            x2={150 + (index % 2) * 100}
            y2={150}
            stroke={activeNodes.includes(index) ? '#a855f7' : '#4b5563'}
            strokeWidth="2"
            className="transition-all duration-1000"
            opacity={activeNodes.includes(index) ? 0.8 : 0.3}
          />
        ))}
      </svg>

      {/* Process Indicators */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="text-center">
          <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Neural Processing</h3>
          <p className="text-gray-300 text-sm">Deep learning algorithms analyze patterns</p>
        </div>
        <div className="text-center">
          <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
          <p className="text-gray-300 text-sm">Instant processing and insight generation</p>
        </div>
        <div className="text-center">
          <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-2">Precision Results</h3>
          <p className="text-gray-300 text-sm">Accurate personality trait identification</p>
        </div>
      </div>
    </div>
  );
};