import React from 'react';
import { DivideIcon as LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  href: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient,
  href
}) => {
  return (
    <Link
      to={href}
      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl block"
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
      
      {/* Icon */}
      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 group-hover:text-gray-200 text-lg leading-relaxed transition-colors mb-6">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
      </div>
    </Link>
  );
};