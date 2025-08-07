import React from 'react';
import { TrendingUp, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface OverallScorecardProps {
  data: {
    overall: number;
    sources: Record<string, number>;
  };
}

export const OverallScorecard: React.FC<OverallScorecardProps> = ({ data }) => {
  const sources = Object.entries(data.sources);
  
  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-400', icon: CheckCircle };
    if (score >= 80) return { level: 'Very Good', color: 'text-blue-400', icon: CheckCircle };
    if (score >= 70) return { level: 'Good', color: 'text-yellow-400', icon: AlertCircle };
    if (score >= 60) return { level: 'Fair', color: 'text-orange-400', icon: AlertCircle };
    return { level: 'Poor', color: 'text-red-400', icon: AlertCircle };
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'email': return '📧';
      case 'calls': return '📞';
      case 'linkedin': return '💼';
      case 'social': return '🌐';
      case 'icp': return '🎯';
      default: return '📄';
    }
  };

  const confidenceInfo = getConfidenceLevel(data.overall);
  const ConfidenceIcon = confidenceInfo.icon;

  return (
    <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Confidence Scorecard</h2>
      </div>

      {/* Overall Score Display */}
      <div className="text-center mb-8 relative">
        <div className="relative inline-block">
          <div className="text-6xl font-black text-white mb-2 animate-pulse-glow">
            {data.overall}%
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <ConfidenceIcon className={`w-5 h-5 ${confidenceInfo.color}`} />
          <div className={`font-semibold ${confidenceInfo.color}`}>
            {confidenceInfo.level} Confidence
          </div>
        </div>
        
        <div className="text-gray-400">Overall Analysis Score</div>
        
        {/* Confidence Ring */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(data.overall / 100) * 251.2} 251.2`}
                className="transition-all duration-2000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Source Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Source Breakdown
        </h3>
        
        {sources.map(([source, score], index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSourceIcon(source)}</span>
                <span className="text-gray-300 capitalize font-medium">{source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{score}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                } animate-pulse`} />
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${score}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-data-flow rounded-full" />
                </div>
              </div>
              
              {/* Score indicator */}
              <div 
                className="absolute top-0 h-3 w-1 bg-white rounded-full transform -translate-x-1/2 transition-all duration-1000"
                style={{ left: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-400 font-semibold text-sm">AI INSIGHT</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Analysis confidence is {confidenceInfo.level.toLowerCase()} based on multiple data sources. 
          {data.overall >= 80 
            ? ' High-quality insights with strong reliability.' 
            : ' Consider providing additional data for enhanced accuracy.'
          }
        </p>
      </div>
    </div>
  );
};