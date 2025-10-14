// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addDataToMap, wrapTo, toggleSidePanel, receiveMapConfig, toggleModal } from '@kepler.gl/actions';
import KeplerGl from './kepler-gl-custom';
import { RootState } from './types';
import { THEME } from '@kepler.gl/constants';
import { suppressKeplerErrors } from './utils/error-handler';
import KeplerControlPanel from './components/custom-panel-header';
import MapControlsPanel from './components/map-controls-panel';

interface AppProps {
  dispatch: Dispatch;
  keplerGl: any;
}

interface AppState {
  width: number;
  height: number;
}

interface MapContainerProps {
  dispatch: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return <MapContainer dispatch={this.props.dispatch} />;
  }
}

class MapContainer extends Component<MapContainerProps> {
  private restoreErrorLogging?: () => void;

  componentDidMount() {
    // Suppress Kepler.gl error notifications
    this.restoreErrorLogging = suppressKeplerErrors();
    
    // Close any modal immediately
    this.props.dispatch(
      wrapTo("map", toggleModal(null))
    );
    
    // Set voyager map style immediately to prevent black background
    this.props.dispatch(
      wrapTo("map", receiveMapConfig({
        version: 'v1',
        config: {
          mapStyle: {
            styleType: 'voyager',
            topLayerGroups: {},
            visibleLayerGroups: {
              label: true,
              road: true,
              border: false,
              building: true,
              water: true,
              land: true,
              '3d building': false
            }
          }
        }
      }))
    );
    
    // Load data first
    setTimeout(() => {
      this.loadMVTData();
    }, 500);
    
    // Set Kepler.gl settings after data loads
    setTimeout(() => {
      this.initializeKeplerSettings();
    }, 1500);
  }

  componentWillUnmount() {
    // Restore original error logging
    if (this.restoreErrorLogging) {
      this.restoreErrorLogging();
    }
  }

  initializeKeplerSettings = () => {
    // Hide side panel initially (but keep it toggleable)
    this.props.dispatch(
      wrapTo("map", toggleSidePanel(null))
    );

    // Set map config with voyager style - executed AFTER data load
    const mapConfig = {
      version: 'v1',
      config: {
        mapState: {
          bearing: 0,
          dragRotate: false,
          latitude: 37.7749295,
          longitude: -122.4194155,
          pitch: 0,
          zoom: 9,
          isSplit: false
        },
        mapStyle: {
          styleType: 'voyager',
          topLayerGroups: {},
          visibleLayerGroups: {
            label: true,
            road: true,
            border: false,
            building: true,
            water: true,
            land: true,
            '3d building': false
          },
          threeDBuildingColor: [9.665468314072013, 17.18305478057247, 31.1442867897876],
          mapStyles: {}
        }
      }
    };

    this.props.dispatch(
      wrapTo("map", receiveMapConfig(mapConfig))
    );
  };

  loadMVTData = async () => {
    try {
      // Dataset MVT (Mapbox Vector Tiles)
      const mvtDataset = {
        info: {
          id: "mvt_population_dataset_id",
          label: "MVT Population",
          format: "rows",
          type: "vector-tile"
        },
        data: {
          fields: [],
          rows: []
        },
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://4sq-studio-public.s3.us-west-2.amazonaws.com/vector-tile/cb_v2/{z}/{x}/{y}.pbf",
          tilesetMetadataUrl: "https://4sq-studio-public.s3.us-west-2.amazonaws.com/vector-tile/cb_v2/metadata.json"
        }
      };

      // Load MVT dataset with voyager style config
      this.props.dispatch(
        wrapTo(
          "map",
          addDataToMap({
            datasets: mvtDataset,
            options: { 
              centerMap: true, 
              keepExistingConfig: false,
              autoCreateLayers: true
            },
            config: {
              mapStyle: {
                styleType: 'voyager',
                topLayerGroups: {},
                visibleLayerGroups: {
                  label: true,
                  road: true,
                  border: false,
                  building: true,
                  water: true,
                  land: true,
                  '3d building': false
                }
              }
            }
          })
        )
      );

    } catch (error) {
      console.warn("Failed to load MVT data:", error);
    }
  };

  render() {
    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh',
        backgroundColor: '#f7f7f7' // Light background to prevent black screen
      }}>
        {/* Kepler.gl Map - Full screen background */}
        <KeplerGl
          id="map"
          theme="light"
          mapboxApiAccessToken={process.env.MapboxAccessToken}
          width={window.innerWidth}
          height={window.innerHeight}
          appName="Telkom GIS Spatial"
        />
        
        {/* Custom Control Panel */}
        <div 
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
        >
          <KeplerControlPanel />
        </div>

        {/* Map Controls Panel - Positioned at bottom center (horizontal layout) */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            pointerEvents: 'auto',
            width: 'calc(100% - 48px)',
            maxWidth: '570px'
          }}
        >
          <MapControlsPanel />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state;
export default connect(mapStateToProps)(App);