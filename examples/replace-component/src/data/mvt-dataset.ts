// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

// MVT Dataset Configuration
export const mvtDatasetConfig = {
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

// Alternative local MVT configuration (example for Jakarta data)
export const jakartaMvtDatasetConfig = {
  info: {
    id: "jakarta_mvt_population",
    label: "Jakarta MVT Population",
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
    tilesetDataUrl: "http://localhost:8080/tiles/jakarta-population/{z}/{x}/{y}.pbf",
    tilesetMetadataUrl: "http://localhost:8080/tiles/jakarta-population/metadata.json"
  }
};

// Function to create MVT dataset with custom configuration
export const createMvtDataset = (
  id: string,
  label: string,
  tilesetDataUrl: string,
  tilesetMetadataUrl?: string
) => ({
  info: {
    id,
    label,
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
    tilesetDataUrl,
    ...(tilesetMetadataUrl && { tilesetMetadataUrl })
  }
});