import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMap } from '@kepler.gl/actions';

interface LayerItem {
  id: string;
  name: string;
  count: number;
  color: string;
  visible: boolean;
  type: 'business' | 'customer' | 'feeder' | 'building' | 'odp' | 'sto';
}

interface MapState {
  keplerGl: {
    map: {
      mapState: {
        zoom: number;
        latitude: number;
        longitude: number;
      };
      mapStyle: {
        styleType: string;
      };
      layers: any[];
      visState: {
        layers: any[];
      };
    };
  };
}

const KeplerGlPanel: React.FC = () => {
  const dispatch = useDispatch();
  
  // Get current state from Kepler.gl
  const keplerState = useSelector((state: any) => state?.keplerGl?.map || {});
  const currentZoom = keplerState?.mapState?.zoom || 13;
  const currentMapStyle = keplerState?.mapStyle?.styleType || 'OpenStreetMap';
  
  const [selectedMapStyle, setSelectedMapStyle] = useState(currentMapStyle);
  const [zoom, setZoom] = useState(Math.round(currentZoom));
  const [showMoreItems, setShowMoreItems] = useState(false);

  const [layers, setLayers] = useState<LayerItem[]>([
    { id: '1', name: 'Business Assets', count: 8, color: '#8B5CF6', visible: true, type: 'business' },
    { id: '2', name: 'Customer Sites', count: 45, color: '#10B981', visible: true, type: 'customer' },
    { id: '3', name: 'Feeder Cable', count: 12, color: '#3B82F6', visible: true, type: 'feeder' },
    { id: '4', name: 'Building', count: 412, color: '#10B981', visible: true, type: 'building' },
    { id: '5', name: 'ODP (Distribution Point)', count: 156, color: '#F59E0B', visible: true, type: 'odp' },
    { id: '6', name: 'STO (Central Office)', count: 15, color: '#EF4444', visible: true, type: 'sto' }
  ]);

  const mapStyles = useMemo(() => [
    { value: 'streets', label: 'OpenStreetMap' },
    { value: 'satellite', label: 'Satellite' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'light', label: 'Light Mode' },
    { value: 'outdoors', label: 'Terrain' }
  ], []);

  // Real functions that interact with Kepler.gl
  const handleMapStyleChange = useCallback((styleValue: string) => {
    const style = mapStyles.find(s => s.value === styleValue);
    if (style) {
      setSelectedMapStyle(style.label);
      // Log the style change (Map style update will be handled by Kepler.gl UI)
      console.log('Map style changed to:', styleValue);
    }
  }, [mapStyles]);

  const handleZoomChange = useCallback((newZoom: number) => {
    const clampedZoom = Math.max(0, Math.min(20, newZoom));
    setZoom(clampedZoom);
    
    // Dispatch action to update map zoom in Kepler.gl
    dispatch(updateMap({
      zoom: clampedZoom,
      latitude: keplerState?.mapState?.latitude || 0,
      longitude: keplerState?.mapState?.longitude || 0
    }));
  }, [dispatch, keplerState]);

  const toggleLayerVisibility = useCallback((layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
    
    // Log the layer toggle (Layer visibility will be handled by Kepler.gl UI)
    console.log('Layer visibility toggled for layer:', layerId);
  }, [layers]);

  const activeLayersCount = layers.filter(layer => layer.visible).length;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '420px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(229, 231, 235, 0.6)',
        overflow: 'hidden',
        zIndex: 50,
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Map Controls Header */}
      <div 
        style={{
          padding: '16px 20px 12px 20px',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}
        >
          <h3 
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgb(55, 65, 81)',
              margin: 0
            }}
          >
            Map Controls
          </h3>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span 
              style={{
                fontSize: '14px',
                color: 'rgb(99, 102, 241)',
                fontWeight: 500
              }}
            >
              Zoom: {zoom}
            </span>
            <span 
              style={{
                fontSize: '14px',
                color: 'rgb(107, 114, 128)'
              }}
            >
              {selectedMapStyle}
            </span>
          </div>
        </div>

        {/* Map Style Selector and Controls */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Map Style Dropdown */}
          <select
            value={selectedMapStyle}
            onChange={(e) => {
              const selectedStyle = mapStyles.find(s => s.label === e.target.value);
              if (selectedStyle) {
                handleMapStyleChange(selectedStyle.value);
              }
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid rgb(229, 231, 235)',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: 'rgb(55, 65, 81)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {mapStyles.map(style => (
              <option key={style.value} value={style.label}>🗺️ {style.label}</option>
            ))}
          </select>

          {/* Control Buttons */}
          <div 
            style={{
              display: 'flex',
              gap: '6px'
            }}
          >
            {/* Zoom Out */}
            <button
              onClick={() => handleZoomChange(zoom - 1)}
              disabled={zoom <= 1}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: zoom <= 1 ? 'rgb(243, 244, 246)' : 'white',
                border: '1px solid rgb(229, 231, 235)',
                color: zoom <= 1 ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)',
                cursor: zoom <= 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              −
            </button>

            {/* Zoom In */}
            <button
              onClick={() => handleZoomChange(zoom + 1)}
              disabled={zoom >= 20}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: zoom >= 20 ? 'rgb(243, 244, 246)' : 'white',
                border: '1px solid rgb(229, 231, 235)',
                color: zoom >= 20 ? 'rgb(156, 163, 175)' : 'rgb(75, 85, 99)',
                cursor: zoom >= 20 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              +
            </button>

            {/* 3D View */}
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid rgb(229, 231, 235)',
                color: 'rgb(75, 85, 99)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.15s ease'
              }}
            >
              📦
            </button>

            {/* Layers */}
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid rgb(229, 231, 235)',
                color: 'rgb(75, 85, 99)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.15s ease'
              }}
            >
              🗂️
            </button>

            {/* Globe */}
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgb(99, 102, 241)',
                border: '1px solid rgb(99, 102, 241)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                transition: 'all 0.15s ease'
              }}
            >
              🌍
            </button>
          </div>
        </div>
      </div>

      {/* Map Legend Section */}
      <div 
        style={{
          padding: '16px 20px'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <h4 
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgb(55, 65, 81)',
              margin: 0
            }}
          >
            Map Legend
          </h4>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span 
              style={{
                fontSize: '14px',
                color: 'rgb(99, 102, 241)',
                fontWeight: 500
              }}
            >
              {activeLayersCount} active
            </span>
            <div 
              style={{
                display: 'flex',
                gap: '4px'
              }}
            >
              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  border: '1px solid rgb(229, 231, 235)',
                  color: 'rgb(75, 85, 99)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
              >
                📍
              </button>
              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  border: '1px solid rgb(229, 231, 235)',
                  color: 'rgb(75, 85, 99)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
              >
                ⚙️
              </button>
              <button
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  border: '1px solid rgb(229, 231, 235)',
                  color: 'rgb(75, 85, 99)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
              >
                ✓
              </button>
            </div>
          </div>
        </div>

        {/* Layer Items Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          {layers.slice(0, showMoreItems ? layers.length : 6).map((layer) => (
            <div
              key={layer.id}
              onClick={() => toggleLayerVisibility(layer.id)}
              style={{
                padding: '12px',
                backgroundColor: layer.visible ? 'rgba(249, 250, 251, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                borderRadius: '10px',
                border: `1px solid ${layer.visible ? 'rgba(229, 231, 235, 0.8)' : 'rgba(229, 231, 235, 0.4)'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative',
                minHeight: '60px'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                <div 
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: layer.color,
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div 
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: layer.visible ? 'rgb(55, 65, 81)' : 'rgb(107, 114, 128)',
                      marginBottom: '4px',
                      lineHeight: '1.3'
                    }}
                  >
                    {layer.name}
                  </div>
                  <div 
                    style={{
                      fontSize: '12px',
                      color: 'rgb(107, 114, 128)'
                    }}
                  >
                    {layer.count} items
                  </div>
                </div>
                <button
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(243, 244, 246, 0.8)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'rgb(107, 114, 128)'
                  }}
                >
                  ℹ️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {layers.length > 6 && (
          <button
            onClick={() => setShowMoreItems(!showMoreItems)}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'white',
              border: '1px solid rgb(229, 231, 235)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgb(75, 85, 99)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              textAlign: 'center'
            }}
          >
            {showMoreItems ? 'Show less items' : `Show ${layers.length - 6} more items`}
          </button>
        )}
      </div>
    </div>
  );
};

export default KeplerGlPanel;