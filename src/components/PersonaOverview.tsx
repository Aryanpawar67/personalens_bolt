import React, { useState } from 'react';
import { User, MapPin, Building, Users, Edit3, Check, X, Sparkles } from 'lucide-react';

interface PersonaOverviewProps {
  data: {
    location: string;
    country: string;
    industry: string;
    companyName: string;
    employeeSize: string;
    gender: string;
  };
}

export const PersonaOverview: React.FC<PersonaOverviewProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    // In real app, this would save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const ProfileAvatar = ({ gender }: { gender: string }) => (
    <div className="relative group">
      <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 animate-pulse-glow">
        <User className="w-14 h-14 text-white" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      <div className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-1">
        <Sparkles className="w-3 h-3 text-white" />
      </div>
    </div>
  );

  return (
    <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          Persona Overview
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-3 rounded-xl glass-card hover:bg-white/20 transition-all duration-300 group-hover:scale-110"
        >
          <Edit3 className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex items-start gap-8">
        <ProfileAvatar gender={data.gender} />
        
        <div className="flex-1 space-y-6">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Location</label>
                  <input
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="w-full glass-card rounded-lg px-4 py-3 text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Country</label>
                  <input
                    value={editData.country}
                    onChange={(e) => setEditData({...editData, country: e.target.value})}
                    className="w-full glass-card rounded-lg px-4 py-3 text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Industry</label>
                  <input
                    value={editData.industry}
                    onChange={(e) => setEditData({...editData, industry: e.target.value})}
                    className="w-full glass-card rounded-lg px-4 py-3 text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">Company</label>
                  <input
                    value={editData.companyName}
                    onChange={(e) => setEditData({...editData, companyName: e.target.value})}
                    className="w-full glass-card rounded-lg px-4 py-3 text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 glass-card hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/10 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">{data.location}</div>
                    <div className="text-gray-400 text-sm">{data.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/10 transition-all duration-300">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-white font-semibold">{data.companyName}</div>
                    <div className="text-gray-400 text-sm">{data.industry}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-white/10 transition-all duration-300">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-semibold">{data.employeeSize} employees</div>
                    <div className="text-gray-400 text-sm">Company size</div>
                  </div>
                </div>
              </div>
              
              {/* AI Confidence Indicator */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-semibold text-sm">AI Extracted</span>
                </div>
                <div className="text-gray-300 text-sm">
                  Information automatically extracted and verified by our AI system
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};