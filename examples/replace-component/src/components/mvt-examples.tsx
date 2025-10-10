// SPDX-License-Identifier: MIT
// Example implementations for MVT datasets in Kepler.gl

import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { addDataToMap, wrapTo } from '@kepler.gl/actions';
import { 
  mvtDatasetConfig, 
  jakartaMvtDatasetConfig, 
  createMvtDataset 
} from '../data/mvt-dataset';
import { 
  jakartaLocalMvtConfig, 
  jakartaMbtilesConfig,
  createAdvancedMvtDataset 
} from '../data/jakarta-mvt-config';

interface MVTExampleProps {
  dispatch: Dispatch;
}

export class MVTExampleComponent extends Component<MVTExampleProps> {
  
  // Example 1: Load single MVT dataset
  loadBasicMVT = () => {
    const mvtDataset = mvtDatasetConfig;
    
    this.props.dispatch(
      wrapTo("map", addDataToMap({
        datasets: mvtDataset,
        options: { centerMap: true, keepExistingConfig: false }
      }))
    );
  };

  // Example 2: Load local Jakarta MVT from .mbtiles
  loadJakartaMVT = () => {
    const mvtDataset = jakartaMbtilesConfig;
    
    this.props.dispatch(
      wrapTo("map", addDataToMap({
        datasets: mvtDataset,
        options: { centerMap: true, keepExistingConfig: false }
      }))
    );
  };

  // Example 3: Load multiple datasets (MVT + GeoJSON)
  loadMultipleDatasets = async () => {
    // Load MVT first
    const mvtDataset = jakartaLocalMvtConfig;
    
    this.props.dispatch(
      wrapTo("map", addDataToMap({
        datasets: mvtDataset,
        options: { centerMap: true, keepExistingConfig: false }
      }))
    );

    // Then load GeoJSON data
    try {
      const response = await fetch("http://localhost:8080/data/jakarta-population.json");
      const geojson = await response.json();
      
      const geojsonDataset = {
        info: {
          label: "Jakarta Population Points",
          id: "jakarta_population_points",
        },
        data: geojson,
      };

      // Add as additional layer
      this.props.dispatch(
        wrapTo("map", addDataToMap({
          datasets: geojsonDataset,
          options: { centerMap: false, keepExistingConfig: true }
        }))
      );
    } catch (error) {
      console.error("Error loading GeoJSON:", error);
    }
  };

  // Example 4: Create custom MVT dataset
  loadCustomMVT = () => {
    const customDataset = createAdvancedMvtDataset(
      "custom_mvt_layer",
      "Custom MVT Layer",
      "http://localhost:8080/tiles/custom/{z}/{x}/{y}.pbf",
      "http://localhost:8080/tiles/custom/metadata.json"
    );

    this.props.dispatch(
      wrapTo("map", addDataToMap({
        datasets: customDataset,
        options: { centerMap: true, keepExistingConfig: false }
      }))
    );
  };

  // Example 5: Load with initial configuration
  loadMVTWithConfig = () => {
    const mvtDataset = jakartaMbtilesConfig;
    
    // Basic configuration - let Kepler.gl auto-detect and style
    const config = {
      version: "v1" as const,
      config: {
        mapState: {
          latitude: -6.195,
          longitude: 106.8318,
          zoom: 10
        }
      }
    };

    this.props.dispatch(
      wrapTo("map", addDataToMap({
        datasets: mvtDataset,
        config,
        options: { centerMap: true, keepExistingConfig: false }
      }))
    );
  };

  componentDidMount() {
    // Choose which example to run:
    
    // Basic MVT loading
    // this.loadBasicMVT();
    
    // Local Jakarta MVT
    // this.loadJakartaMVT();
    
    // Multiple datasets
    this.loadMultipleDatasets();
    
    // Custom MVT
    // this.loadCustomMVT();
    
    // MVT with config
    // this.loadMVTWithConfig();
  }

  render() {
    return null; // This is just a utility component
  }
}

// Export configurations for use in main app
export {
  mvtDatasetConfig,
  jakartaMvtDatasetConfig,
  jakartaLocalMvtConfig,
  jakartaMbtilesConfig,
  createMvtDataset,
  createAdvancedMvtDataset
};