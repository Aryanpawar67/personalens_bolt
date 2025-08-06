import React from 'react';
import { TrendingUp } from 'lucide-react';

interface OverallScorecardProps {
  data: {
    overall: number;
    sources: Record<string, number>;
  };
}

export const OverallScorecard: React.FC<OverallScorecardProps> = ({ data }) => {
  const sources = Object.entries(data.sources);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Overall Scorecard</h2>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-white mb-2">{data.overall}%</div>
        <div className="text-gray-300">Confidence Score</div>
      </div>

      {/* Confidence Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Confidence Breakdown</h3>
        {sources.map(([source, score], index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">{source}</span>
              <span className="text-white font-semibold">{score}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};