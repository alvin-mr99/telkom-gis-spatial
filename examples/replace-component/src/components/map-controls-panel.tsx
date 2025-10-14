import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Map,
  Layers,
  Minus,
  Plus,
  Box,
  Globe,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  mapStyleChange,
  toggleSplitMap,
  togglePerspective,
  layerVisConfigChange,
  updateMap,
  removeLayer,
  layerConfigChange
} from '@kepler.gl/actions';

// Map style options
const mapStyles = [
  { id: 'voyager', label: 'Voyager' },
  { id: 'dark', label: 'Dark Matter' },
  { id: 'light', label: 'Positron' },
  { id: 'satellite', label: 'Satellite' },
  { id: 'muted', label: 'Muted' },
  { id: 'muted_night', label: 'Muted Night' }
];

// Mock data untuk legend items
const initialLegendItems = [
  { id: 1, name: 'Business Assets', count: 8, color: '#8b5cf6', active: true },
  { id: 2, name: 'Customer Sites', count: 45, color: '#14b8a6', active: true },
  { id: 3, name: 'Feeder Cable', count: 12, color: '#3b82f6', active: true },
  { id: 4, name: 'Building', count: 412, color: '#14b8a6', active: true },
  { id: 5, name: 'ODP (Distribution Point)', count: 156, color: '#f97316', active: true },
  { id: 6, name: 'STO (Central Office)', count: 15, color: '#ef4444', active: true },
  { id: 7, name: 'Pole', count: 230, color: '#06b6d4', active: false },
  { id: 8, name: 'Manhole', count: 89, color: '#84cc16', active: false },
  { id: 9, name: 'Joint Closure', count: 145, color: '#ec4899', active: false },
  { id: 10, name: 'Splitter', count: 78, color: '#a855f7', active: false },
  { id: 11, name: 'OLT', count: 12, color: '#f59e0b', active: false },
  { id: 12, name: 'Router', count: 25, color: '#10b981', active: false },
  { id: 13, name: 'Switch', count: 34, color: '#6366f1', active: false },
  { id: 14, name: 'Access Point', count: 56, color: '#f43f5e', active: false },
  { id: 15, name: 'Server', count: 8, color: '#8b5cf6', active: false }
];

function MapControlsPanel() {
  const dispatch = useDispatch();
  const keplerGl = useSelector((state: any) => state.keplerGl?.map);
  
  const [mapStyleOpen, setMapStyleOpen] = useState(false);
  const [showAllLegend, setShowAllLegend] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(false);
  const [legendMinimized, setLegendMinimized] = useState(false);
  const [legendItems, setLegendItems] = useState(initialLegendItems);
  
  const mapStyleRef = useRef<HTMLDivElement>(null);
  
  // Get real data from Kepler.gl state - with fallback
  const mapState = keplerGl?.mapState || {};
  const zoom = mapState.zoom || 16;
  const mapStyle = keplerGl?.mapStyle?.styleType || 'voyager';
  const pitch = mapState.pitch || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapStyleRef.current && !mapStyleRef.current.contains(event.target as Node)) {
        setMapStyleOpen(false);
      }
    };

    if (mapStyleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mapStyleOpen]);

  // Update 3D state based on pitch
  useEffect(() => {
    setIs3DEnabled(pitch > 0);
  }, [pitch]);

  // Handle zoom in
  const handleZoomIn = () => {
    const viewport = keplerGl?.mapState;
    if (viewport) {
      const newZoom = Math.min((viewport.zoom || 0) + 1, 20);
      dispatch(
        updateMap({
          ...viewport,
          zoom: newZoom
        })
      );
    }
  };

  // Handle zoom out
  const handleZoomOut = () => {
    const viewport = keplerGl?.mapState;
    if (viewport) {
      const newZoom = Math.max((viewport.zoom || 0) - 1, 0);
      dispatch(
        updateMap({
          ...viewport,
          zoom: newZoom
        })
      );
    }
  };

  // Handle map style change
  const handleMapStyleChange = (styleId: string) => {
    dispatch(mapStyleChange(styleId));
    setMapStyleOpen(false);
  };

  // Toggle 3D view
  const handle3DToggle = () => {
    dispatch(togglePerspective());
  };

  // Toggle split map
  const handleSplitMap = () => {
    dispatch(toggleSplitMap());
  };

  // Toggle legend item (update local state for now)
  const toggleLegendItem = (id: number) => {
    setLegendItems(items =>
      items.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
    
    // TODO: If connected to real Kepler layers, dispatch layerVisConfigChange
    // const layer = layers.find(l => l.id === `layer-${id}`);
    // if (layer) {
    //   dispatch(layerVisConfigChange(layer, { isVisible: !item.active }));
    // }
  };

  // Toggle all legend items visibility
  const toggleAllLegendVisibility = () => {
    const allActive = legendItems.every(item => item.active);
    const newActiveState = !allActive;
    
    setLegendItems(items =>
      items.map(item => ({ ...item, active: newActiveState }))
    );
    
    // TODO: If connected to real Kepler layers, toggle all
    // layers.forEach(layer => {
    //   dispatch(layerVisConfigChange(layer, { isVisible: newActiveState }));
    // });
  };

  const activeLegendCount = legendItems.filter(item => item.active).length;
  const visibleLegendItems = showAllLegend ? legendItems : legendItems.slice(0, 6);
  const hiddenCount = legendItems.length - 6;

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Map Controls Section */}
      <div className="px-3 py-2 border-b border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-900">Map Controls</h3>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-blue-600">Zoom: {Math.round(zoom)}</span>
            <span className="text-[10px] text-gray-500 capitalize">{mapStyle}</span>
          </div>
        </div>
        
        {/* Controls Row */}
        <div className="flex items-center gap-1.5">
          {/* Map Style Dropdown */}
          <div className="relative flex-1" ref={mapStyleRef}>
            <button
              onClick={() => setMapStyleOpen(!mapStyleOpen)}
              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded text-left text-[11px] font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-1.5"
            >
              <Map size={12} className="text-gray-600" />
              <span className="flex-1 capitalize">{mapStyle}</span>
              <ChevronDown
                size={11}
                className={`text-gray-500 transition-transform duration-200 ${
                  mapStyleOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mapStyleOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 overflow-hidden">
                {mapStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleMapStyleChange(style.id)}
                    className={`w-full px-2 py-1.5 text-left text-[11px] hover:bg-blue-50 transition-colors duration-150 ${
                      style.id === mapStyle || style.label.toLowerCase() === mapStyle.toLowerCase()
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            title="Zoom Out"
          >
            <Minus size={12} className="text-gray-700" />
          </button>

          <button
            onClick={handleZoomIn}
            className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            title="Zoom In"
          >
            <Plus size={12} className="text-gray-700" />
          </button>

          <button
            onClick={handle3DToggle}
            className={`w-7 h-7 rounded border border-gray-300 transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
              is3DEnabled
                ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            }`}
            title="3D View"
          >
            <Box size={12} />
          </button>

          <button
            onClick={handleSplitMap}
            className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            title="Split Map"
          >
            <Layers size={12} className="text-gray-700" />
          </button>

          <button
            className="w-7 h-7 rounded border border-gray-300 bg-blue-500 hover:bg-blue-600 transition-all duration-200 flex items-center justify-center shadow-sm flex-shrink-0"
            title="Globe View"
          >
            <Globe size={12} className="text-white" />
          </button>
        </div>
      </div>

      {/* Map Legend Section */}
      <div className="px-3 py-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-semibold text-gray-900">Map Legend</h3>
            <span className="text-[10px] font-medium text-blue-600">{activeLegendCount} active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                // TODO: Open modal/dialog untuk add new layer
                console.log('Add new layer');
              }}
              className="w-6 h-6 rounded border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
              title="Add Layer"
            >
              <Plus size={11} className="text-gray-700" />
            </button>
            <button
              onClick={toggleAllLegendVisibility}
              className="w-6 h-6 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
              title={legendItems.every(item => item.active) ? "Hide All" : "Show All"}
            >
              {legendItems.every(item => item.active) ? (
                <EyeOff size={11} className="text-gray-700" />
              ) : (
                <Eye size={11} className="text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setLegendMinimized(!legendMinimized)}
              className="w-6 h-6 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
              title={legendMinimized ? 'Expand Legend' : 'Minimize Legend'}
            >
              {legendMinimized ? (
                <ChevronDown size={11} className="text-gray-700" />
              ) : (
                <ChevronUp size={11} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Legend Items Grid - Only show when not minimized */}
        {!legendMinimized && (
          <>
            <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-0.5">
              {visibleLegendItems.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleLegendItem(item.id)}
              className={`p-1.5 rounded border transition-all duration-200 text-left ${
                item.active
                  ? 'bg-white border-gray-300 hover:border-gray-400 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Remove/delete this layer
                    console.log('Remove layer:', item.id);
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove Layer"
                >
                  <Minus size={10} />
                </button>
              </div>
              <div className="text-[11px] font-semibold text-gray-900 mb-0.5 line-clamp-1">
                {item.name}
              </div>
              <div className="text-[9px] text-gray-500">{item.count} items</div>
            </button>
              ))}
            </div>

            {/* Show More/Less Button */}
            {!showAllLegend && hiddenCount > 0 && (
              <button
                onClick={() => setShowAllLegend(true)}
                className="w-full mt-1.5 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 text-[11px] font-medium text-gray-700 flex items-center justify-center gap-1"
              >
                <span>Show {hiddenCount} more items</span>
                <ChevronDown size={12} className="text-gray-600" />
              </button>
            )}
            
            {showAllLegend && hiddenCount > 0 && (
              <button
                onClick={() => setShowAllLegend(false)}
                className="w-full mt-1.5 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 text-[11px] font-medium text-gray-700 flex items-center justify-center gap-1"
              >
                <span>Show Less</span>
                <ChevronUp size={12} className="text-gray-600" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MapControlsPanel;
