import React, { useState } from 'react';
import {
  X,
  Users,
  Circle,
  Crosshair,
  MapPin,
  BarChart3,
  Clock,
  Calculator,
  Play
} from 'lucide-react';

interface SpatialAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'use-cases' | 'results' | 'temporal';

interface UseCase {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
  params: string;
  selected?: boolean;
}

const useCases: UseCase[] = [
  {
    id: 'household-proximity',
    icon: <Users size={20} className="text-pink-500" />,
    title: 'Household Proximity Analysis',
    description: 'Find households within distance of infrastructure',
    type: 'spatial',
    params: '3 params',
    selected: true
  },
  {
    id: 'radius-buffer',
    icon: <Circle size={20} className="text-gray-600" />,
    title: 'Radius Search / Buffer',
    description: 'Create buffer zones around selected points',
    type: 'spatial',
    params: '3 params'
  },
  {
    id: 'intersection-check',
    icon: <Crosshair size={20} className="text-pink-500" />,
    title: 'Intersection Check',
    description: 'Check point-in-polygon relationships',
    type: 'table',
    params: '3 params'
  },
  {
    id: 'nearest-point',
    icon: <MapPin size={20} className="text-pink-500" />,
    title: 'Nearest Point Search',
    description: 'Find closest infrastructure to each point',
    type: 'table',
    params: '3 params'
  },
  {
    id: 'coverage-analysis',
    icon: <BarChart3 size={20} className="text-pink-500" />,
    title: 'Coverage Analysis',
    description: 'Analyze service coverage by region',
    type: 'chart',
    params: '3 params'
  }
];

function SpatialAnalysisModal({ isOpen, onClose }: SpatialAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('use-cases');
  const [searchRadius, setSearchRadius] = useState(500);
  const [infrastructureType, setInfrastructureType] = useState('ODC');
  const [householdType, setHouseholdType] = useState('All Households');

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[10001] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Spatial Analysis</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Section Header with Icon */}
          <div className="px-5 py-4 bg-pink-50 border-b border-pink-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <Calculator size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Spatial Analysis</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('use-cases')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'use-cases'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Use Cases
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'results'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab('temporal')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'temporal'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Temporal
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-5 pb-5">
            {activeTab === 'use-cases' && (
              <div>
                {/* Use Cases List */}
                <h3 className="text-xs font-semibold text-gray-900 mb-3 mt-2">
                  Analysis Use Cases
                </h3>
                <div className="space-y-2">
                  {useCases.map((useCase) => (
                    <button
                      key={useCase.id}
                      className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                        useCase.selected
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{useCase.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 mb-0.5">
                            {useCase.title}
                          </h4>
                          <p className="text-[10px] text-gray-600 mb-2">
                            {useCase.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-medium text-gray-700">
                              {useCase.type}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-medium text-gray-700">
                              {useCase.params}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Analysis Parameters */}
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M5 1V9M1 5H9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xs font-semibold text-gray-900">
                      Analysis Parameters
                    </h3>
                  </div>

                  {/* Search Radius Slider */}
                  <div className="mb-4">
                    <label className="text-[10px] font-medium text-gray-700 mb-2 block">
                      Search Radius (meters)
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="100"
                        max="2000"
                        step="50"
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-pink-500"
                      />
                      <div className="flex justify-between text-[9px] text-gray-500 mt-1">
                        <span>100m</span>
                        <span className="font-medium text-gray-900">{searchRadius}m</span>
                        <span>2000m</span>
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Type Dropdown */}
                  <div className="mb-3">
                    <label className="text-[10px] font-medium text-gray-700 mb-1.5 block">
                      Infrastructure Type
                    </label>
                    <select
                      value={infrastructureType}
                      onChange={(e) => setInfrastructureType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="ODC">ODC</option>
                      <option value="ODP">ODP</option>
                      <option value="STO">STO</option>
                      <option value="Feeder Cable">Feeder Cable</option>
                    </select>
                  </div>

                  {/* Household Type Dropdown */}
                  <div>
                    <label className="text-[10px] font-medium text-gray-700 mb-1.5 block">
                      Household Type
                    </label>
                    <select
                      value={householdType}
                      onChange={(e) => setHouseholdType(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="All Households">All Households</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Calculator size={32} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No analysis results yet
                </h3>
                <p className="text-xs text-gray-500">
                  Run an analysis to see results here
                </p>
              </div>
            )}

            {activeTab === 'temporal' && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Clock size={32} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Time-Based Analysis
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  Enable time-based analysis
                </p>
                <p className="text-[10px] text-gray-400">
                  Analyze infrastructure changes over time
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Run Button (only show on Use Cases tab) */}
        {activeTab === 'use-cases' && (
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
            <button className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
              <Play size={14} fill="white" />
              <span>Run Analysis</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SpatialAnalysisModal;
