import React from 'react';

interface PersonalityCardProps {
  trait: string;
  score: number;
  gradient: string;
  delay: number;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({
  trait,
  score,
  gradient,
  delay
}) => {
  return (
    <div 
      className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{trait}</h3>
        <span className="text-2xl font-bold text-white">{score}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <div className="mt-3 text-sm text-gray-300">
        {score >= 80 && "Very High"}
        {score >= 60 && score < 80 && "High"}
        {score >= 40 && score < 60 && "Moderate"}
        {score >= 20 && score < 40 && "Low"}
        {score < 20 && "Very Low"}
      </div>
    </div>
  );
};