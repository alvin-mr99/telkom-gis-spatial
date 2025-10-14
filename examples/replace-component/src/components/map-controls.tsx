import React, { useState } from 'react';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  type: 'point' | 'polygon' | 'line';
}

const MapControlsPanel: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'MVT Population', visible: true, type: 'point' },
    { id: '2', name: 'Administrative Boundaries', visible: false, type: 'polygon' },
    { id: '3', name: 'Roads Network', visible: false, type: 'line' },
  ]);

  const [zoom, setZoom] = useState(5);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 20));
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 0));

  const getLayerIcon = (type: Layer['type']) => {
    switch (type) {
      case 'point': return '●';
      case 'polygon': return '▢';
      case 'line': return '—';
      default: return '○';
    }
  };

  return (
    <div 
      className="map-controls-panel"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(243, 244, 246, 0.6)',
        overflow: 'hidden',
        zIndex: 50,
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Header */}
      <div 
        style={{
          background: 'linear-gradient(to right, #fff, #f9fafb)',
          padding: '16px',
          borderBottom: '1px solid rgb(243, 244, 246)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h3 
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgb(55, 65, 81)',
            margin: 0
          }}
        >
          Map Controls
        </h3>
        <span 
          style={{
            fontSize: '12px',
            color: 'rgb(156, 163, 175)',
            backgroundColor: 'rgb(249, 250, 251)',
            padding: '2px 8px',
            borderRadius: '4px'
          }}
        >
          v2.5.0
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Layers Section */}
        <div style={{ marginBottom: '12px' }}>
          <h4 
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgb(107, 114, 128)',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Layers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => toggleLayerVisibility(layer.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: layer.visible ? 'rgb(249, 250, 251)' : 'transparent',
                  borderRadius: '6px',
                  border: '1px solid rgb(229, 231, 235)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontSize: '13px'
                }}
                onMouseEnter={(e) => {
                  if (!layer.visible) {
                    e.currentTarget.style.backgroundColor = 'rgb(249, 250, 251)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!layer.visible) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span 
                  style={{
                    width: '12px',
                    height: '12px',
                    fontSize: '8px',
                    color: layer.visible ? 'rgb(37, 99, 235)' : 'rgb(156, 163, 175)'
                  }}
                >
                  {getLayerIcon(layer.type)}
                </span>
                <span 
                  style={{
                    flex: 1,
                    color: layer.visible ? 'rgb(55, 65, 81)' : 'rgb(107, 114, 128)',
                    fontWeight: layer.visible ? 500 : 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {layer.name}
                </span>
                <div 
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: layer.visible ? 'rgb(59, 130, 246)' : 'rgb(229, 231, 235)',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {layer.visible && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: '5px',
                        width: '6px',
                        height: '3px',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid white',
                        transform: 'rotate(-45deg)'
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div style={{ marginTop: '12px' }}>
          <h4 
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgb(107, 114, 128)',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Zoom Level
          </h4>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              backgroundColor: 'rgb(249, 250, 251)',
              borderRadius: '6px',
              border: '1px solid rgb(229, 231, 235)'
            }}
          >
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 0}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: zoom <= 0 ? 'rgb(229, 231, 235)' : 'rgb(59, 130, 246)',
                color: zoom <= 0 ? 'rgb(156, 163, 175)' : 'white',
                border: 'none',
                cursor: zoom <= 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (zoom > 0) {
                  e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
                }
              }}
              onMouseLeave={(e) => {
                if (zoom > 0) {
                  e.currentTarget.style.backgroundColor = 'rgb(59, 130, 246)';
                }
              }}
            >
              −
            </button>
            <div 
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgb(55, 65, 81)'
              }}
            >
              {zoom}
            </div>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 20}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: zoom >= 20 ? 'rgb(229, 231, 235)' : 'rgb(59, 130, 246)',
                color: zoom >= 20 ? 'rgb(156, 163, 175)' : 'white',
                border: 'none',
                cursor: zoom >= 20 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (zoom < 20) {
                  e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
                }
              }}
              onMouseLeave={(e) => {
                if (zoom < 20) {
                  e.currentTarget.style.backgroundColor = 'rgb(59, 130, 246)';
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControlsPanel;