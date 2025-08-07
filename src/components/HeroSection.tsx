import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Brain, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4), transparent 50%)`
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-morphing-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-morphing-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className={`max-w-6xl mx-auto text-center relative z-10 ${isVisible ? 'animate-float-up' : 'opacity-0'}`}>
        {/* AI Badge */}
        <div className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3 mb-8 group hover:scale-105 transition-all duration-300">
          <div className="relative">
            <Brain className="w-5 h-5 text-blue-400 animate-neural-pulse" />
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-30 animate-pulse" />
          </div>
          <span className="text-blue-300 font-semibold tracking-wide">POWERED BY ADVANCED AI</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>

        {/* Main Heading with Advanced Typography */}
        <h1 className="text-7xl md:text-8xl font-black text-white mb-8 leading-tight">
          <span className="block">Discover Your</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-shift">
            PersonaLens
          </span>
        </h1>

        {/* Enhanced Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Transform conversations into comprehensive personality insights with our 
          <span className="text-cyan-400 font-semibold"> cutting-edge AI technology</span>. 
          Analyze documents, calls, and communications in seconds.
        </p>

        {/* Advanced CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Link
            to="/input"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 interactive-hover"
          >
            <div className="flex items-center gap-3 relative z-10">
              <Brain className="w-6 h-6" />
              Start Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <button className="group glass-card px-8 py-4 rounded-2xl font-bold text-lg text-white hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Watch Demo
            </div>
          </button>
        </div>

        {/* Enhanced Stats with Real-time Feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Target className="w-6 h-6 text-green-400" />
              <div className="text-4xl font-black text-white">99.7%</div>
            </div>
            <div className="text-gray-400 font-medium">Analysis Accuracy</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-data-flow" />
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <div className="text-4xl font-black text-white">50K+</div>
            </div>
            <div className="text-gray-400 font-medium">Profiles Analyzed</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-data-flow" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div className="text-4xl font-black text-white">{"< 3s"}</div>
            </div>
            <div className="text-gray-400 font-medium">Processing Time</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-data-flow" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Neural Network Visualization */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 neural-grid opacity-30" />
          <div className="relative z-10 flex justify-center items-center gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-neural-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};