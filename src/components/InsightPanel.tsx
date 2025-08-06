import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InsightPanelProps {
  icon: LucideIcon;
  title: string;
  content: string;
  confidence: number;
  delay: number;
}

export const InsightPanel: React.FC<InsightPanelProps> = ({
  icon: Icon,
  title,
  content,
  confidence,
  delay
}) => {
  return (
    <div 
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">{content}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">AI Confidence</span>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-white">{confidence}%</span>
        </div>
      </div>
    </div>
  );
};