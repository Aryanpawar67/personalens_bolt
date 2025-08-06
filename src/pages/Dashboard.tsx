import React from 'react';
import { PersonaOverview } from '../components/PersonaOverview';
import { OceanAnalysis } from '../components/OceanAnalysis';
import { OverallScorecard } from '../components/OverallScorecard';
import { DeepInsights } from '../components/DeepInsights';

interface AnalysisData {
  extractedInfo: {
    location: string;
    country: string;
    industry: string;
    companyName: string;
    employeeSize: string;
    gender: string;
  };
  oceanAnalysis: {
    scores: Record<string, number>;
    benchmarks: Record<string, number>;
    subFacets: Record<string, any>;
  };
  sentimentAnalysis: {
    overall: number;
    breakdown: Record<string, number>;
  };
  confidenceBreakdown: {
    overall: number;
    sources: Record<string, number>;
  };
  deepInsights: {
    keyTopics: string[];
    communicationStyle: string;
    decisionCues: string[];
    objections: string[];
    nextSteps: string[];
    summary: string;
  };
}

export const Dashboard: React.FC = () => {
  // In a real app, this would come from props or URL params
  const mockAnalysisData: AnalysisData = {
    extractedInfo: {
      location: "San Francisco, CA",
      country: "United States",
      industry: "Technology",
      companyName: "TechCorp Inc.",
      employeeSize: "500-1000",
      gender: "Male"
    },
    oceanAnalysis: {
      scores: {
        openness: 85,
        conscientiousness: 72,
        extraversion: 68,
        agreeableness: 91,
        neuroticism: 34
      },
      benchmarks: {
        openness: 70,
        conscientiousness: 75,
        extraversion: 65,
        agreeableness: 80,
        neuroticism: 45
      },
      subFacets: {}
    },
    sentimentAnalysis: {
      overall: 0.7,
      breakdown: {
        email: 0.6,
        calls: 0.8
      }
    },
    confidenceBreakdown: {
      overall: 87,
      sources: {
        email: 85,
        calls: 90,
        linkedin: 75,
        social: 60,
        icp: 95
      }
    },
    deepInsights: {
      keyTopics: ["Product Integration", "Budget Planning", "Team Scalability"],
      communicationStyle: "Direct and analytical, prefers data-driven discussions",
      decisionCues: ["ROI metrics", "Implementation timeline", "Team impact"],
      objections: ["Budget constraints", "Integration complexity"],
      nextSteps: ["Schedule technical demo", "Provide ROI analysis", "Connect with technical team"],
      summary: "Client shows high interest in technical solutions with strong analytical approach to decision making."
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-300">
            Comprehensive personality and communication insights
          </p>
        </div>

        {/* Analysis Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Row */}
          <PersonaOverview data={mockAnalysisData.extractedInfo} />
          <OverallScorecard data={mockAnalysisData.confidenceBreakdown} />
          
          {/* Bottom Row */}
          <OceanAnalysis data={mockAnalysisData.oceanAnalysis} />
          <DeepInsights data={mockAnalysisData.deepInsights} />
        </div>
      </div>
    </div>
  );
};