import React from 'react';
import { FileText, Users, TrendingUp, Zap } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const stats = [
    { icon: FileText, label: 'Documents Analyzed', value: '247', gradient: 'from-purple-500 to-pink-500' },
    { icon: Users, label: 'Profiles Created', value: '18', gradient: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: 'Accuracy Score', value: '94.7%', gradient: 'from-green-500 to-emerald-500' },
    { icon: Zap, label: 'Avg Processing Time', value: '2.3s', gradient: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 group hover:border-white/20 transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
              {stat.value}
            </div>
            <div className="text-gray-300 font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};