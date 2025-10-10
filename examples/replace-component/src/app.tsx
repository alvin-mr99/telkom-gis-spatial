// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addDataToMap, wrapTo, updateMap } from '@kepler.gl/actions';
import KeplerGl from './kepler-gl-custom';
import { RootState } from './types';
import { suppressKeplerErrors, createSafeDatasetConfig } from './utils/error-handler';

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

  render() {
    return <MapContainer dispatch={this.props.dispatch} />;
  }
}

class MapContainer extends Component<MapContainerProps> {
  private restoreErrorLogging?: () => void;

  componentDidMount() {
    // Suppress Kepler.gl error notifications
    this.restoreErrorLogging = suppressKeplerErrors();
    this.loadMVTData();
  }

  componentWillUnmount() {
    // Restore original error logging
    if (this.restoreErrorLogging) {
      this.restoreErrorLogging();
    }
  }

  loadMVTData = async () => {
    try {
      // Dataset MVT (Mapbox Vector Tiles) - Updated URLs
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

      // Load MVT dataset with error suppression
      setTimeout(() => {
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
            })
          )
        );
      }, 500); // Small delay to ensure Kepler.gl is ready

      // Optional: Load additional GeoJSON data
      setTimeout(() => {
        this.loadGeoJSONData();
      }, 1000);
    } catch (error) {
      console.warn("Failed to load MVT data:", error);
      // Fallback: try to load only GeoJSON data
      this.loadGeoJSONData();
    }
  };

  loadGeoJSONData = async () => {
    try {
      const response = await fetch("http://localhost:8080/data/jakarta-population.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const geojson = await response.json();
      const geojsonDataset = {
        info: {
          label: "Jakarta Population",
          id: "jakarta_population",
        },
        data: geojson,
      };

      // Add GeoJSON as separate dataset
      this.props.dispatch(
        wrapTo(
          "map",
          addDataToMap({
            datasets: geojsonDataset,
            options: { 
              centerMap: false, 
              keepExistingConfig: true,
              autoCreateLayers: true
            },
          })
        )
      );
    } catch (error) {
      // Silently fail for GeoJSON - no error notifications
      console.warn("GeoJSON data not available:", error instanceof Error ? error.message : String(error));
    }
  };



  render() {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <KeplerGl
          id="map"
          mapboxApiAccessToken={process.env.MapboxAccessToken}
          width={window.innerWidth}
          height={window.innerHeight}
          appName="Telkom GIS Spatial"
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state;
export default connect(mapStateToProps)(App);
