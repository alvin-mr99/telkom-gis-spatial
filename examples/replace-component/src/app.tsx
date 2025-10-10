// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {addDataToMap, wrapTo, updateMap} from '@kepler.gl/actions';
import KeplerGl from './kepler-gl-custom';
import {RootState} from './types';

interface AppProps {
  dispatch: Dispatch;
  keplerGl: any;
}

interface AppState {
  width: number;
  height: number;
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
    // Load konfigurasi dari config.json yang sudah ada dengan perbaikan tipe data
    const jakartaMVTConfig = {
      version: 'v1' as const,
      config: {
        visState: {
          filters: [],
          layers: [
            {
              id: 'jakarta-population-mvt',
              type: 'vectorTile',
              config: {
                dataId: 'mvt_population_dataset_id',
                label: 'Jakarta Population MVT',
                color: [248, 149, 112] as [number, number, number],
                highlightColor: [252, 242, 26, 255] as [number, number, number, number],
                columns: {},
                isVisible: true,
                visConfig: {
                  strokeColor: null,
                  strokeOpacity: 0.8,
                  radius: 8,
                  radiusUnits: true,
                  enable3d: false,
                  stroked: true,
                  transition: false,
                  heightRange: [0, 500] as [number, number],
                  elevationScale: 5,
                  opacity: 0.85,
                  colorRange: {
                    name: 'Jakarta Population',
                    type: 'custom',
                    category: 'Custom',
                    colors: [
                      '#0198BD',
                      '#42C1BC',
                      '#9CE3B1',
                      '#F5B272',
                      '#EB7053',
                      '#D50255'
                    ]
                  }
                }
              },
              visualChannels: {
                colorField: {
                  name: 'populasi',
                  type: 'real'
                },
                colorScale: 'quantile',
                sizeField: {
                  name: 'populasi',
                  type: 'real'
                },
                sizeScale: 'sqrt'
              }
            }
          ],
          interactionConfig: {
            tooltip: {
              fieldsToShow: {
                'mvt_population_dataset_id': [
                  {name: 'kelurahan', format: null},
                  {name: 'kecamatan', format: null},
                  {name: 'kota', format: null},
                  {name: 'populasi', format: null},
                  {name: 'kepadatan', format: null},
                  {name: 'luas_km2', format: null},
                  {name: 'jumlah_kk', format: null}
                ]
              },
              enabled: true,
              compareMode: false,
              compareType: 'absolute'
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
          latitude: -6.2331,
          longitude: 106.8341,
          pitch: 0,
          zoom: 11,
          isSplit: false
        },
        mapStyle: {
          styleType: 'custom',
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
          threeDBuildingColor: [9.665468314072013, 17.18305478057247, 31.1442867897876] as [number, number, number],
          mapStyles: {
            custom: {
              accessToken: null,
              custom: true,
              icon: 'https://api.maptiler.com/maps/voyager/static/0,0,1/30x30.png?key=fTJJzVpdrOiuvPhQVFv7',
              id: 'custom',
              label: 'Jakarta Population Voyager',
              url: 'http://localhost:8080/styles/jakarta-population/style.json'
            }
          }
        },
        uiState: {
          readOnly: false,
          currentModal: null
        }
      }
    };

    // Load MVT data dengan format yang benar untuk vector tiles
    this.props.dispatch(
      wrapTo(
        'map',
        addDataToMap({
          datasets: [
            {
              info: {
                label: 'Jakarta Population MVT',
                id: 'mvt_population_dataset_id'
              },
              data: {
                // Untuk MVT, kita menggunakan format fields dan rows kosong
                // karena data akan diambil langsung dari tile server
                fields: [],
                rows: [],
                // Metadata MVT untuk kepler.gl
                metadata: {
                  url: 'http://localhost:8080/data/jakarta-population/{z}/{x}/{y}.pbf',
                  layerName: 'jakarta-population'
                }
              }
            }
          ],
          config: jakartaMVTConfig
        })
      )
    );

    // Set initial viewport to Jakarta
    setTimeout(() => {
      this.props.dispatch(
        wrapTo(
          'map',
          updateMap({
            latitude: -6.2331,
            longitude: 106.8341,
            zoom: 11
          })
        )
      );
    }, 1000);
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              id="map"
              mapboxApiAccessToken={process.env.MapboxAccessToken}
              width={width}
              height={height}
              appName="Telkom GIS Spatial"
              version="v1"
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state;
export default connect(mapStateToProps)(App);
