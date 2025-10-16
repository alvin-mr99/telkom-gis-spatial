// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addDataToMap, wrapTo, toggleSidePanel, receiveMapConfig, toggleModal, toggleMapControl } from '@kepler.gl/actions';
import KeplerGl from './kepler-gl-custom';
import { RootState } from './types';
import { THEME } from '@kepler.gl/constants';
import { suppressKeplerErrors } from './utils/error-handler';
import KeplerControlPanel from './components/custom-panel-header';
import MapControlsPanel from './components/map-controls-panel';
import CustomPanelRight from './components/custom-panel-right';
import PanelToggleButton from './components/panel-toggle-button';
import LoginPage from './components/login-page';

interface AppProps {
  dispatch: Dispatch;
  keplerGl: any;
}

interface AppState {
  width: number;
  height: number;
  isAuthenticated: boolean;
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
      isAuthenticated: isAuth
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
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

    if (!isAuthenticated) {
      return <LoginPage onLogin={this.handleLogin} />;
    }

    return <MapContainer dispatch={this.props.dispatch}
      rightPanelOpen={this.state.rightPanelOpen}
      onToggleRightPanel={this.toggleRightPanel}
      onCloseRightPanel={this.closeRightPanel} />;
  }
}

interface MapContainerProps {
  dispatch: any;
  rightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onCloseRightPanel: () => void;
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

    // Aktivkan legend setelah settings diinisialisasi
    setTimeout(() => {
      this.props.dispatch(
        wrapTo("map", toggleMapControl('mapLegend'))
      );
    }, 2000);

    this.loadHouseholdTiles();
  }

  componentWillUnmount() {
    // Restore original error logging
    if (this.restoreErrorLogging) {
      this.restoreErrorLogging();
    }
  }

  initializeKeplerSettings = () => {
    const mapConfig = {
      version: 'v1',
      config: {
        mapState: {
          bearing: 0,
          dragRotate: false,
          latitude: -0.7893, // Ubah dari -2.5489 ke -0.7893 (lebih ke utara)
          longitude: 113.9213, // Ubah dari 118.0149 ke 113.9213 (lebih ke kiri sedikit)
          pitch: 0,
          zoom: 4, 
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
        data: { fields: [], rows: [] },
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
        data: { fields: [], rows: [] },
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_clustered_tiles/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/household_points_clustered_tiles/metadata.json"
        }
      };

      // Sumber T-Sto Boundaries - akan di-hide secara default
      const TStoBoundaries = {
        info: {
          id: "t_sto_boundaries",
          label: "T-Sto Boundaries",
          format: "rows",
          type: "vector-tile"
        },
        data: { fields: [], rows: [] },
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_sto_boundaries/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_sto_boundaries/metadata.json"
        }
      };

      // Sumber T-Bay External - akan di-hide secara default
      const TbayExternal = {
        info: {
          id: "t_bay_external",
          label: "T-Bay External",
          format: "rows",
          type: "vector-tile"
        },
        data: { fields: [], rows: [] },
        metadata: {
          type: "remote",
          remoteTileFormat: "mvt",
          tilesetDataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_bay_external/{z}/{x}/{y}",
          tilesetMetadataUrl: "https://telkom-access-geospatial-martin.3ddm.my.id/t_bay_external/metadata.json"
        }
      };

      // Dispatch dataset dengan koordinat yang sudah disesuaikan
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
              },
              config: {
                mapState: {
                  latitude: -0.7893, // Ubah dari -2.5489 ke -0.7893
                  longitude: 113.9213, // Ubah dari 118.0149 ke 113.9213
                  zoom: 4
                }
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

      // Load T-Sto Boundaries dengan visibility hidden
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
              },
              config: {
                visState: {
                  layers: [{
                    id: "t_sto_boundaries_layer",
                    config: {
                      isVisible: false // Hide layer by default
                    }
                  }]
                }
              }
            })
          )
        );
      }, 1000);

      // Load T-Bay External dengan visibility hidden
      setTimeout(() => {
        this.props.dispatch(
          wrapTo(
            "map",
            addDataToMap({
              datasets: TbayExternal,
              options: {
                centerMap: false,
                keepExistingConfig: true,
                autoCreateLayers: true
              },
              config: {
                visState: {
                  layers: [{
                    id: "t_bay_external_layer",
                    config: {
                      isVisible: false // Hide layer by default
                    }
                  }]
                }
              }
            })
          )
        );
      }, 1400);

    } catch (error) {
      console.warn("Household vector tiles not available:", error instanceof Error ? error.message : String(error));
    }
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