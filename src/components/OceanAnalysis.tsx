import React from 'react';
import { RadarChart } from './RadarChart';

interface OceanAnalysisProps {
  data: {
    scores: Record<string, number>;
    benchmarks: Record<string, number>;
    subFacets: Record<string, any>;
  };
}

export const OceanAnalysis: React.FC<OceanAnalysisProps> = ({ data }) => {
  const traits = [
    { trait: 'Openness', score: data.scores.openness, benchmark: data.benchmarks.openness },
    { trait: 'Conscientiousness', score: data.scores.conscientiousness, benchmark: data.benchmarks.conscientiousness },
    { trait: 'Extraversion', score: data.scores.extraversion, benchmark: data.benchmarks.extraversion },
    { trait: 'Agreeableness', score: data.scores.agreeableness, benchmark: data.benchmarks.agreeableness },
    { trait: 'Neuroticism', score: data.scores.neuroticism, benchmark: data.benchmarks.neuroticism },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">OCEAN Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div>
          <RadarChart 
            data={traits.map(t => ({ 
              trait: t.trait, 
              score: t.score, 
              color: 'from-purple-500 to-purple-600' 
            }))} 
          />
        </div>

        {/* Performance Cards */}
        <div className="space-y-4">
          {traits.map((trait, index) => {
            const difference = trait.score - trait.benchmark;
            const percentage = ((trait.score / trait.benchmark) * 100) - 100;
            
            return (
              <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{trait.trait}</h3>
                  <span className="text-white font-bold">{trait.score}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-gray-400">Industry Avg</div>
                    <div className="text-gray-300">{trait.benchmark}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Difference</div>
                    <div className={`${difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {difference >= 0 ? '+' : ''}{difference}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">vs Industry</div>
                    <div className={`${percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};