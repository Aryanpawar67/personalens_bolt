import React from 'react';

interface FloatingOrbProps {
  size: 'small' | 'medium' | 'large';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay: number;
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({ size, position, delay }) => {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const positionClasses = {
    'top-left': 'top-20 left-10',
    'top-right': 'top-32 right-10',
    'bottom-left': 'bottom-20 left-20',
    'bottom-right': 'bottom-32 right-20'
  };

  return (
    <div 
      className={`absolute ${sizeClasses[size]} ${positionClasses[position]} opacity-20 pointer-events-none`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};