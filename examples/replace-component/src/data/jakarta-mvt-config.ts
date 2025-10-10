// SPDX-License-Identifier: MIT
// Jakarta MVT Configuration for local tileserver

export const jakartaLocalMvtConfig = {
  info: {
    id: "jakarta_population_mvt_local",
    label: "Jakarta Population (Local MVT)",
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
    // Local tileserver URL pattern - assumes you have tileserver running on port 8080
    tilesetDataUrl: "http://localhost:8080/data/jakarta-population-mvt/{z}/{x}/{y}.pbf",
    // Optional metadata URL if your tileserver provides it
    tilesetMetadataUrl: "http://localhost:8080/data/jakarta-population-mvt.json"
  }
};

// Configuration for the existing .mbtiles file via tileserver
export const jakartaMbtilesConfig = {
  info: {
    id: "jakarta_mbtiles_dataset",
    label: "Jakarta Population (MBTiles)",
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
    // This assumes tileserver-gl is serving the .mbtiles file
    tilesetDataUrl: "http://localhost:8080/data/jakarta-population/{z}/{x}/{y}.pbf",
    tilesetMetadataUrl: "http://localhost:8080/data/jakarta-population.json"
  }
};

// Function to start a simple tileserver for .mbtiles file
export const TILESERVER_SETUP_INSTRUCTIONS = `
To use the local .mbtiles file with MVT:

1. Install tileserver-gl:
   npm install -g @mapbox/tileserver-gl

2. Start tileserver with your .mbtiles file:
   tileserver-gl-light --file jakarta-population.mbtiles --port 8080

3. The tiles will be available at:
   http://localhost:8080/data/jakarta-population/{z}/{x}/{y}.pbf

4. Metadata available at:
   http://localhost:8080/data/jakarta-population.json
`;

// Advanced configuration with custom styling
export const createAdvancedMvtDataset = (
  id: string,
  label: string,
  tileUrl: string,
  metadataUrl?: string
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
    tilesetDataUrl: tileUrl,
    ...(metadataUrl && { tilesetMetadataUrl: metadataUrl }),
    // Additional MVT-specific options
    options: {
      // Maximum zoom level
      maxzoom: 14,
      // Minimum zoom level  
      minzoom: 0,
      // Attribution text
      attribution: "© Your Data Source",
      // Vector layer names (if known)
      layers: ["population_layer"]
    }
  }
});