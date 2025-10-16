// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { addDataToMap, wrapTo, toggleSidePanel, receiveMapConfig, toggleModal } from '@kepler.gl/actions';
import KeplerGl from './kepler-gl-custom';
import { RootState } from './types';
import { THEME } from '@kepler.gl/constants';
import { suppressKeplerErrors } from './utils/error-handler';
import KeplerControlPanel from './components/custom-panel-header';
import MapControlsPanel from './components/map-controls-panel';
import CustomPanelRight from './components/custom-panel-right';
import PanelToggleButton from './components/panel-toggle-button';
import LoginPage from './components/login-page';
import ProfileDropdown from './components/profile-dropdown';

interface AppProps {
  dispatch: Dispatch;
  keplerGl: any;
}

interface AppState {
  width: number;  
  height: number;
  isAuthenticated: boolean;
  rightPanelOpen: boolean;
}

interface MapContainerProps {
  dispatch: any;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    
    // Check if user is already authenticated
    const isAuth = localStorage.getItem('telkom_gis_auth') === 'true';
    console.log('🔐 Auth check:', isAuth);
    
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      isAuthenticated: isAuth,
      rightPanelOpen: false
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    
    // Re-check auth status on mount (in case localStorage was modified)
    const isAuth = localStorage.getItem('telkom_gis_auth') === 'true';
    if (isAuth !== this.state.isAuthenticated) {
      console.log('🔄 Auth state mismatch, updating...', { localStorage: isAuth, state: this.state.isAuthenticated });
      this.setState({ isAuthenticated: isAuth });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    localStorage.removeItem('telkom_gis_auth');
    localStorage.removeItem('telkom_gis_user');
    this.setState({ isAuthenticated: false });
  };

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  toggleRightPanel = () => {
    this.setState(prevState => ({
      rightPanelOpen: !prevState.rightPanelOpen
    }));
  };

  closeRightPanel = () => {
    this.setState({ rightPanelOpen: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={this.handleLogin} />
            )
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <MapContainer 
                dispatch={this.props.dispatch}
                rightPanelOpen={this.state.rightPanelOpen}
                onToggleRightPanel={this.toggleRightPanel}
                onCloseRightPanel={this.closeRightPanel}
                onLogout={this.handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        {/* Catch all route - redirect based on auth status */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
          } 
        />
      </Routes>
    );
  }
}

interface MapContainerProps {
  dispatch: any;
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onCloseRightPanel: () => void;
  onLogout: () => void;
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
    // setTimeout(() => {
    //   this.loadMVTData();
    // }, 500);
    
    // Set Kepler.gl settings after data loads
    setTimeout(() => {
      this.initializeKeplerSettings();
    }, 1500);

    this.loadHouseholdTiles();
  }

  componentWillUnmount() {
    // Restore original error logging
    if (this.restoreErrorLogging) {
      this.restoreErrorLogging();
    }
  }

  // Tambahan: Auto-load dataset vector tile untuk households (sesuai test_martin.html)
  loadHouseholdTiles = async () => {
    try {
      // Sumber Sampling - dengan metadata URL untuk deteksi source-layer
      const householdsSamplingDataset = {
        info: {
          id: "households_sampling_tileset",
          label: "Indonesia Households (Sampling)",
          format: "rows",
          type: "vector-tile"
        },
        data: {fields: [], rows: []},
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_tiles/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_tiles/metadata.json"
        }
      };

      // Sumber Clustering - dengan metadata URL untuk deteksi source-layer
      const householdsClusteringDataset = {
        info: {
          id: "households_clustering_tileset",
          label: "Indonesia Households (Clustering)",
          format: "rows",
          type: "vector-tile"
        },
        data: {fields: [], rows: []},
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_clustered_tiles/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_clustered_tiles/metadata.json"
        }
      };

      // Sumber Clustering - dengan metadata URL untuk deteksi source-layer
      const TStoBoundaries = {
        info: {
          id: "t_sto_boundaries",
          label: "T-Sto Boundaries",
          format: "rows",
          type: "vector-tile"
        },
        data: {fields: [], rows: []},
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_sto_boundaries/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_sto_boundaries/metadata.json"
        }
      };

       // Sumber Clustering - dengan metadata URL untuk deteksi source-layer
       const TbayExternal = {
        info: {
          id: "t_bay_external",
          label: "T-Bay External",
          format: "rows",
          type: "vector-tile"
        },
        data: {fields: [], rows: []},
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_bay_external/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_bay_external/metadata.json"
        }
      };

      // Dispatch kedua dataset dengan delay yang lebih pendek
      setTimeout(() => {
        this.props.dispatch(
          wrapTo(
            "map",
            addDataToMap({
              datasets: householdsSamplingDataset,
              options: {
                centerMap: true,
                keepExistingConfig: false,
                autoCreateLayers: true
              }
            })
          )
        );
      }, 800);

      setTimeout(() => {
        this.props.dispatch(
          wrapTo(
            "map",
            addDataToMap({
              datasets: householdsClusteringDataset,
              options: {
                centerMap: false,
                keepExistingConfig: true,
                autoCreateLayers: true
              }
            })
          )
        );
      }, 1200);

      setTimeout(() => {
        this.props.dispatch(
          wrapTo(
            "map",
            addDataToMap({
              datasets: TStoBoundaries,
              options: {
                centerMap: false,
                keepExistingConfig: true,
                autoCreateLayers: true
              }
            })
          )
        );
      }, 1000);
      setTimeout(() => {
        this.props.dispatch(
          wrapTo(
            "map",
            addDataToMap({
              datasets: TbayExternal,
            })
          )
        );
      }, 1400);

    } catch (error) {
      console.warn("Household vector tiles not available:", error instanceof Error ? error.message : String(error));
    }
  };

  initializeKeplerSettings = () => {
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
    const { keplerGl } = this.props;
    
    // Get current map style to determine theme
    const currentMapStyle = keplerGl?.map?.mapStyle?.styleType || 'voyager';
    const isDarkTheme = currentMapStyle === 'dark' || currentMapStyle === 'muted_night';
    const keplerTheme = isDarkTheme ? 'dark' : 'light';
    
    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh',
        backgroundColor: '#f7f7f7'
      }}>
        {/* Kepler.gl Map - Full screen background */}
        <KeplerGl
          id="map"
          theme={keplerTheme}
          mapboxApiAccessToken={process.env.MapboxAccessToken}
          width={window.innerWidth}
          height={window.innerHeight}
          appName="Telkom GIS Spatial"
          version="v2.6.0"
        />
        
        {/* Custom Control Panel - Top Header */}
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
          <KeplerControlPanel onToggleRightPanel={this.props.onToggleRightPanel} />
        </div>

        {/* Right Side Controls Container */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 1001,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-end'
          }}
        >
          {/* Profile Dropdown - Top of stack */}
          <div style={{ pointerEvents: 'auto' }}>
            <ProfileDropdown onLogout={this.props.onLogout} />
          </div>
          
          {/* Spacer to push Kepler controls down */}
          <div style={{ height: '8px' }} />
        </div>

        {/* Custom Right Panel - Analysis Dashboard */}
        <CustomPanelRight 
          isOpen={this.props.rightPanelOpen}
          onClose={this.props.onCloseRightPanel}
        />

        {/* Panel Toggle Button */}
        <PanelToggleButton 
          isOpen={this.props.rightPanelOpen}
          onToggle={this.props.onToggleRightPanel}
        />

        {/* Map Controls Panel - Positioned at bottom center (horizontal layout) */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
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