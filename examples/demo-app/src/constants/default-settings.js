// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

/* different option share same query type e.g. events,
and segments both use queryRunner */
import keyMirror from 'keymirror';

export const ASSETS_URL = 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl/';
export const DATA_URL = 'https://raw.githubusercontent.com/keplergl/kepler.gl-data/master/';
export const MAP_URI = 'demo/map?mapUrl=';
/*
 * If you want to add more samples, feel free to edit the json file on github kepler.gl data repo
 */
export const MAP_CONFIG_URL = `${DATA_URL}samples.json?nocache=${new Date().getTime()}`;

/**
 * I know this is already defined in Kepler core but it should be defined here
 * because it belongs to the demo app
 * @type {string}
 */
export const KEPLER_GL_WEBSITE = 'http://kepler.gl/';

export const QUERY_TYPES = keyMirror({
  file: null,
  sample: null
});

export const QUERY_OPTIONS = keyMirror({
  csv: null,
  geojson: null
});

export const LOADING_METHODS = keyMirror({
  remote: null,
  sample: null
});

export const LOADING_SAMPLE_LIST_ERROR_MESSAGE = 'Not able to load sample gallery';
export const LOADING_SAMPLE_ERROR_MESSAGE = 'Not able to load sample';
export const CORS_LINK = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS';

export const DEFAULT_FEATURE_FLAGS = {
  cloudStorage: true
};

export const CLOUD_PROVIDERS_CONFIGURATION = {
  // Use public MapBox token if not provided
  MAPBOX_TOKEN: process.env.MapboxAccessToken || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  DROPBOX_CLIENT_ID: process.env.DropboxClientId || '',
  MAPBOX_EXPORT_TOKEN: process.env.MapboxExportToken || '',
  CARTO_CLIENT_ID: process.env.CartoClientId || '',
  CARTO_API_URL: process.env.CartoApiUrl || 'https://gcp-us-east1.api.carto.com',
  FOURSQUARE_CLIENT_ID: process.env.FoursquareClientId || '',
  FOURSQUARE_DOMAIN: process.env.FoursquareDomain || '',
  FOURSQUARE_API_URL: process.env.FoursquareAPIURL || '',
  FOURSQUARE_USER_MAPS_URL: process.env.FoursquareUserMapsURL || ''
};

// Set Carto as default cloud provider
export const DEFAULT_CLOUD_PROVIDER = 'carto';
