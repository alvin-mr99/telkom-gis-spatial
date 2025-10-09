import {SampleDataRow} from '../types';

export const sampleData: SampleDataRow[] = [
  {
    TreeID: 1,
    Species: 'Quercus robur',
    Address: '123 Main St',
    Latitude: 37.7749,
    Longitude: -122.4194,
    DBH: 25,
    Height: 15
  },
  {
    TreeID: 2,
    Species: 'Acer platanoides',
    Address: '456 Oak Ave',
    Latitude: 37.7849,
    Longitude: -122.4094,
    DBH: 18,
    Height: 12
  },
  {
    TreeID: 3,
    Species: 'Tilia cordata',
    Address: '789 Pine St',
    Latitude: 37.7649,
    Longitude: -122.4294,
    DBH: 22,
    Height: 14
  }
];

export const sampleDataConfig = {
  version: 'v1',
  config: {
    mapStyle: {
      styleType: 'voyager'
    },
    mapState: {
      latitude: 37.7749,
      longitude: -122.4194,
      zoom: 11
    }
  }
};

export interface JakartaPOI {
  id: number;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating: number;
  description: string;
}

export const jakartaSampleData: JakartaPOI[] = [
  {
    id: 1,
    name: 'Monas (National Monument)',
    category: 'Tourism',
    latitude: -6.1754,
    longitude: 106.8272,
    rating: 4.5,
    description: 'National monument of Indonesia'
  },
  {
    id: 2,
    name: 'Grand Indonesia Mall',
    category: 'Shopping',
    latitude: -6.1944,
    longitude: 106.8229,
    rating: 4.3,
    description: 'Large shopping mall in Central Jakarta'
  },
  {
    id: 3,
    name: 'Kota Tua Jakarta',
    category: 'Tourism',
    latitude: -6.1352,
    longitude: 106.8133,
    rating: 4.2,
    description: 'Historic old town of Jakarta'
  },
  {
    id: 4,
    name: 'Ancol Beach',
    category: 'Recreation',
    latitude: -6.1223,
    longitude: 106.8412,
    rating: 4.0,
    description: 'Popular beach destination in North Jakarta'
  },
  {
    id: 5,
    name: 'Kemang Village',
    category: 'Dining',
    latitude: -6.2615,
    longitude: 106.8172,
    rating: 4.1,
    description: 'Trendy dining and nightlife area'
  },
  {
    id: 6,
    name: 'Ragunan Zoo',
    category: 'Recreation',
    latitude: -6.3118,
    longitude: 106.8197,
    rating: 3.9,
    description: 'Large zoo in South Jakarta'
  },
  {
    id: 7,
    name: 'PIK Avenue',
    category: 'Shopping',
    latitude: -6.1079,
    longitude: 106.7367,
    rating: 4.2,
    description: 'Modern shopping center in North Jakarta'
  },
  {
    id: 8,
    name: 'Istiqlal Mosque',
    category: 'Religious',
    latitude: -6.1702,
    longitude: 106.8297,
    rating: 4.6,
    description: 'Largest mosque in Southeast Asia'
  }
];

export const jakartaConfig = {
  version: 'v1',
  config: {
    visState: {
      filters: [],
      layers: [
        {
          id: 'jakarta_poi_layer',
          type: 'point',
          config: {
            dataId: 'jakarta_poi',
            label: 'Jakarta POI',
            color: [255, 203, 153],
            columns: {
              lat: 'latitude',
              lng: 'longitude'
            },
            isVisible: true,
            visConfig: {
              radius: 10,
              fixedRadius: false,
              opacity: 0.8,
              outline: false,
              thickness: 2,
              strokeColor: null,
              colorRange: {
                name: 'Global Warming',
                type: 'sequential',
                category: 'Uber',
                colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300']
              },
              strokeColorRange: {
                name: 'Global Warming',
                type: 'sequential',
                category: 'Uber',
                colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300']
              },
              radiusRange: [0, 50],
              filled: true
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: 'start',
                alignment: 'center'
              }
            ]
          },
          visualChannels: {
            colorField: {
              name: 'category',
              type: 'string'
            },
            colorScale: 'ordinal',
            sizeField: {
              name: 'rating',
              type: 'real'
            },
            sizeScale: 'linear'
          }
        }
      ],
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            jakarta_poi: [
              {
                name: 'name',
                format: null
              },
              {
                name: 'category',
                format: null
              },
              {
                name: 'rating',
                format: null
              },
              {
                name: 'description',
                format: null
              }
            ]
          },
          compareMode: false,
          compareType: 'absolute',
          enabled: true
        },
        brush: {
          size: 0.5,
          enabled: false
        },
        geocoder: {
          enabled: false
        },
        coordinate: {
          enabled: false
        }
      },
      layerBlending: 'normal',
      splitMaps: [],
      animationConfig: {
        currentTime: null,
        speed: 1
      }
    },
    mapState: {
      bearing: 0,
      dragRotate: false,
      latitude: -6.2088,
      longitude: 106.8456,
      pitch: 0,
      zoom: 11,
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
        '3d building': true
      },
      threeDBuildingColor: [9.665468314072013, 17.18305478057247, 31.1442867897876],
      mapStyles: {}
    }
  }
};