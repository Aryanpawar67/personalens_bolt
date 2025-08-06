import React, { useState } from 'react';
import { User, MapPin, Building, Users, Edit3, Check, X } from 'lucide-react';

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

  const ProfileSVG = ({ gender }: { gender: string }) => (
    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
      <User className="w-12 h-12 text-white" />
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Persona Overview</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <Edit3 className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex items-start gap-6">
        <ProfileSVG gender={data.gender} />
        
        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">Location</label>
                  <input
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">Country</label>
                  <input
                    value={editData.country}
                    onChange={(e) => setEditData({...editData, country: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">Industry</label>
                  <input
                    value={editData.industry}
                    onChange={(e) => setEditData({...editData, industry: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">Company</label>
                  <input
                    value={editData.companyName}
                    onChange={(e) => setEditData({...editData, companyName: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{data.location}, {data.country}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building className="w-4 h-4" />
                <span>{data.companyName} • {data.industry}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>{data.employeeSize} employees</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};