import React, { useState, useEffect } from 'react';
import { Brain, Upload, Zap, Target, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { FeatureCard } from '../components/FeatureCard';
import { FloatingOrb } from '../components/FloatingOrb';
import { AIVisualization } from '../components/AIVisualization';

export const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced neural networks analyze personality patterns with unprecedented accuracy and depth.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Upload,
      title: "PDF Intelligence",
      description: "Upload documents and let our AI extract meaningful personality insights instantly.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Precision Mapping",
      description: "Get detailed persona mapping with interactive visualizations and actionable insights.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast analysis powered by cutting-edge machine learning algorithms.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.3), transparent 40%)`
        }}
      />
      
      {/* Floating Orbs */}
      <FloatingOrb size="large" position="top-left" delay={0} />
      <FloatingOrb size="medium" position="top-right" delay={2} />
      <FloatingOrb size="small" position="bottom-left" delay={1} />

      {/* Hero Section */}
      <HeroSection />

      {/* AI Visualization Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Advanced AI</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of personality analysis with our state-of-the-art neural networks
            </p>
          </div>
          <AIVisualization />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">CORE FEATURES</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need for deep personality insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="flex items-center justify-center mb-6">
              <Eye className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to unlock your PersonaLens?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered deeper insights about themselves and others
            </p>
            <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};