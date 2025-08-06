import React from 'react';
import { Brain, MessageCircle, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface DeepInsightsProps {
  data: {
    keyTopics: string[];
    communicationStyle: string;
    decisionCues: string[];
    objections: string[];
    nextSteps: string[];
    summary: string;
  };
}

export const DeepInsights: React.FC<DeepInsightsProps> = ({ data }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Deep Communication Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Key Topics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Key Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keyTopics.map((topic, index) => (
                <span 
                  key={index}
                  className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Communication Style */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Communication Style</h3>
            </div>
            <p className="text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10">
              {data.communicationStyle}
            </p>
          </div>

          {/* Decision Cues */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Decision Cues</h3>
            </div>
            <ul className="space-y-2">
              {data.decisionCues.map((cue, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {cue}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Objections */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Potential Objections</h3>
            </div>
            <ul className="space-y-2">
              {data.objections.map((objection, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  {objection}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Recommended Next Steps</h3>
            </div>
            <ul className="space-y-2">
              {data.nextSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">AI Summary</h3>
            <p className="text-gray-300 bg-white/5 rounded-lg p-4 border border-white/10 leading-relaxed">
              {data.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};