import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapStyleChange } from '@kepler.gl/actions';
import {
  X,
  Palette,
  Sun,
  Moon,
  Mountain,
  Map as MapIcon,
  Grid,
  Layers as LayersIcon,
  Eye,
  Box,
  Lightbulb
} from 'lucide-react';

interface ModalMapStyleProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'styles' | 'layers' | '3d-view';

interface MapStyle {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  variants: Array<{ name: string; value: string }>;
  selected?: boolean;
}

interface Layer {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  opacity: number;
}

const mapStyles: MapStyle[] = [
  {
    id: 'voyager',
    icon: <Sun size={24} className="text-orange-500" />,
    title: 'Light',
    description: 'Clean light theme for detailed analysis',
    variants: [
      { name: 'maplibre', value: 'Voyager' },
      { name: 'Light', value: 'Light' }
    ],
    selected: true
  },
  {
    id: 'dark',
    icon: <Moon size={24} className="text-gray-700" />,
    title: 'Dark',
    description: 'Dark theme for night operations',
    variants: [
      { name: 'maplibre', value: 'Dark Matter' },
      { name: 'Dark', value: 'Dark' }
    ]
  },
  {
    id: 'satellite',
    icon: <Mountain size={24} className="text-blue-600" />,
    title: 'Satellite',
    description: 'High-resolution satellite imagery',
    variants: [
      { name: 'satellite', value: 'Satellite' },
      { name: 'Satellite', value: 'Satellite' }
    ]
  },
  {
    id: 'muted',
    icon: <MapIcon size={24} className="text-green-600" />,
    title: 'Terrain',
    description: 'Topographic with elevation data',
    variants: [
      { name: 'muted', value: 'Muted' },
      { name: 'Terrain', value: 'Terrain' }
    ]
  },
  {
    id: 'light',
    icon: <Grid size={24} className="text-blue-500" />,
    title: 'Streets',
    description: 'Detailed street-level mapping',
    variants: [
      { name: 'positron', value: 'Light' },
      { name: 'Light', value: 'Light' }
    ]
  },
  {
    id: 'muted_night',
    icon: <Sun size={24} className="text-purple-400" />,
    title: 'Minimal',
    description: 'Minimal design for data focus',
    variants: [
      { name: 'muted night', value: 'Muted Night' },
      { name: 'Light', value: 'Light' }
    ]
  }
];

const layers: Layer[] = [
  {
    id: 'as-plan',
    icon: <LayersIcon size={20} className="text-blue-500" />,
    title: 'As-Plan Infrastructure',
    subtitle: 'As-Plan Status',
    color: '#3b82f6',
    opacity: 80
  },
  {
    id: 'as-built',
    icon: <LayersIcon size={20} className="text-green-500" />,
    title: 'As-Built Infrastructure',
    subtitle: 'As-Built Status',
    color: '#10b981',
    opacity: 90
  },
  {
    id: 'high-level',
    icon: <LayersIcon size={20} className="text-yellow-500" />,
    title: 'High-Level Design',
    subtitle: 'High-Level Status',
    color: '#f59e0b',
    opacity: 85
  }
];

const ModalMapStyle: React.FC<ModalMapStyleProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const keplerGl = useSelector((state: any) => state.keplerGl?.map);
  
  const [activeTab, setActiveTab] = useState<TabType>('styles');
  const [layerOpacities, setLayerOpacities] = useState<Record<string, number>>({
    'as-plan': 80,
    'as-built': 90,
    'high-level': 85
  });

  // Get current map style from Kepler.gl state
  const currentMapStyle = keplerGl?.mapStyle?.styleType || 'voyager';

  if (!isOpen) return null;

  const handleStyleSelect = (styleId: string) => {
    // Dispatch Kepler.gl action to change map style
    dispatch(mapStyleChange(styleId));
  };

  const handleOpacityChange = (layerId: string, opacity: number) => {
    setLayerOpacities(prev => ({
      ...prev,
      [layerId]: opacity
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[10001] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Map Style & Layers</h2>
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
          <div className="px-5 py-4 bg-purple-50 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Palette size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Map Style & Layers</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('styles')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'styles'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Styles
              </button>
              <button
                onClick={() => setActiveTab('layers')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'layers'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Layers
              </button>
              <button
                onClick={() => setActiveTab('3d-view')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === '3d-view'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                3D View
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-5 pb-5">
            {/* Styles Tab */}
            {activeTab === 'styles' && (
              <div className="space-y-3 mt-4">
                {/* Map Style Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {mapStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        currentMapStyle === style.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {style.icon}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            {style.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                            {style.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        {style.variants.map((variant, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-[10px] font-medium text-gray-700 rounded"
                          >
                            {variant.name}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Style Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => handleStyleSelect('voyager')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sun size={14} />
                    Light
                  </button>
                  <button 
                    onClick={() => handleStyleSelect('dark')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Moon size={14} />
                    Dark
                  </button>
                  <button 
                    onClick={() => handleStyleSelect('satellite')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mountain size={14} />
                    Satellite
                  </button>
                </div>
              </div>
            )}

            {/* Layers Tab */}
            {activeTab === 'layers' && (
              <div className="space-y-4 mt-4">
                {layers.map((layer) => (
                  <div key={layer.id} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: layer.color + '20' }}
                      >
                        {layer.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900">
                          {layer.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{layer.subtitle}</div>
                      </div>
                    </div>
                    
                    {/* Opacity Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-600">Opacity</span>
                        <span className="text-xs font-medium text-gray-900">
                          {layerOpacities[layer.id]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layerOpacities[layer.id]}
                        onChange={(e) => handleOpacityChange(layer.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                ))}

                {/* Status Legend */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye size={16} className="text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">Status Legend</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-gray-700">High-Level Design</span>
                      <span className="text-xs text-gray-500 ml-auto">(Planning Phase)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-gray-700">As-Plan</span>
                      <span className="text-xs text-gray-500 ml-auto">(Design Complete)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-700">As-Built</span>
                      <span className="text-xs text-gray-500 ml-auto">(Construction Complete)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3D View Tab */}
            {activeTab === '3d-view' && (
              <div className="space-y-4 mt-4">
                {/* 3D Building View Card */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    3D Building View
                  </div>
                  <div className="text-xs text-gray-600">Enable realistic building heights</div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                      <Box size={16} className="text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">Extrusion</div>
                    <div className="text-xs text-gray-500">Height-based rendering</div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                      <Lightbulb size={16} className="text-green-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">Shadows</div>
                    <div className="text-xs text-gray-500">Realistic lighting</div>
                  </div>
                </div>

                {/* Empty State */}
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mountain size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Enable 3D view to access advanced controls
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMapStyle;