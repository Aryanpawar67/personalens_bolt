import React, { useState } from 'react';
import { RadarChart } from './RadarChart';
import { Brain, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface OceanAnalysisProps {
  data: {
    scores: Record<string, number>;
    benchmarks: Record<string, number>;
    subFacets: Record<string, any>;
  };
}

export const OceanAnalysis: React.FC<OceanAnalysisProps> = ({ data }) => {
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);

  const traits = [
    { 
      trait: 'Openness', 
      key: 'openness',
      score: data.scores.openness, 
      benchmark: data.benchmarks.openness,
      color: 'from-purple-500 to-pink-500',
      description: 'Creativity, curiosity, and openness to new experiences'
    },
    { 
      trait: 'Conscientiousness', 
      key: 'conscientiousness',
      score: data.scores.conscientiousness, 
      benchmark: data.benchmarks.conscientiousness,
      color: 'from-blue-500 to-cyan-500',
      description: 'Organization, discipline, and goal-oriented behavior'
    },
    { 
      trait: 'Extraversion', 
      key: 'extraversion',
      score: data.scores.extraversion, 
      benchmark: data.benchmarks.extraversion,
      color: 'from-green-500 to-emerald-500',
      description: 'Social energy, assertiveness, and positive emotions'
    },
    { 
      trait: 'Agreeableness', 
      key: 'agreeableness',
      score: data.scores.agreeableness, 
      benchmark: data.benchmarks.agreeableness,
      color: 'from-yellow-500 to-orange-500',
      description: 'Cooperation, trust, and empathy towards others'
    },
    { 
      trait: 'Neuroticism', 
      key: 'neuroticism',
      score: data.scores.neuroticism, 
      benchmark: data.benchmarks.neuroticism,
      color: 'from-red-500 to-pink-500',
      description: 'Emotional stability and stress management'
    },
  ];

  const getPerformanceIcon = (score: number, benchmark: number) => {
    const difference = score - benchmark;
    if (difference > 5) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (difference < -5) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getPerformanceText = (score: number, benchmark: number) => {
    const difference = score - benchmark;
    if (difference > 10) return 'Significantly Above Average';
    if (difference > 5) return 'Above Average';
    if (difference > -5) return 'Average';
    if (difference > -10) return 'Below Average';
    return 'Significantly Below Average';
  };

  return (
    <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300 lg:col-span-2">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">OCEAN Personality Analysis</h2>
        <div className="ml-auto flex items-center gap-2 glass-card px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">AI Analyzed</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Enhanced Radar Chart */}
        <div className="relative">
          <div className="chart-container">
            <RadarChart 
              data={traits.map(t => ({ 
                trait: t.trait, 
                score: t.score, 
                color: t.color 
              }))} 
            />
          </div>
          
          {/* Chart Legend */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            {traits.map((trait, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 glass-card rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTrait(selectedTrait === trait.key ? null : trait.key)}
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${trait.color}`} />
                <span className="text-white text-sm font-medium">{trait.trait}</span>
                <span className="text-gray-400 text-sm ml-auto">{trait.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Performance Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Performance Analysis
          </h3>
          
          {traits.map((trait, index) => {
            const difference = trait.score - trait.benchmark;
            const percentage = ((trait.score / trait.benchmark) * 100) - 100;
            const isSelected = selectedTrait === trait.key;
            
            return (
              <div 
                key={index} 
                className={`glass-card rounded-xl p-5 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isSelected ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedTrait(selectedTrait === trait.key ? null : trait.key)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${trait.color}`} />
                    <h4 className="text-white font-semibold">{trait.trait}</h4>
                    {getPerformanceIcon(trait.score, trait.benchmark)}
                  </div>
                  <span className="text-white font-bold text-lg">{trait.score}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${trait.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${trait.score}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Industry Avg</div>
                    <div className="text-gray-300 font-semibold">{trait.benchmark}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Difference</div>
                    <div className={`font-semibold ${difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {difference >= 0 ? '+' : ''}{difference}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">vs Industry</div>
                    <div className={`font-semibold ${percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {percentage >= 0 ? '+' : ''}{percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {/* Performance Summary */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">
                      {getPerformanceText(trait.score, trait.benchmark)}
                    </span>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 animate-float-up">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};