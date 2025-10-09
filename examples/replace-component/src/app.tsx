// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {addDataToMap, wrapTo} from '@kepler.gl/actions';
import KeplerGl from '@kepler.gl/components';
import {RootState} from './types';
import {jakartaSampleData, jakartaConfig} from './data/sample-data';

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
    // Load Jakarta sample data with Voyager map style
    this.props.dispatch(
      wrapTo(
        'map',
        addDataToMap({
          datasets: [
            {
              info: {
                label: 'Jakarta Points of Interest',
                id: 'jakarta_poi'
              },
              data: {
                fields: [
                  {name: 'id', type: 'integer'},
                  {name: 'name', type: 'string'},
                  {name: 'category', type: 'string'},
                  {name: 'latitude', type: 'real'},
                  {name: 'longitude', type: 'real'},
                  {name: 'rating', type: 'real'},
                  {name: 'description', type: 'string'}
                ],
                rows: jakartaSampleData.map(item => [
                  item.id,
                  item.name,
                  item.category,
                  item.latitude,
                  item.longitude,
                  item.rating,
                  item.description
                ])
              }
            }
          ],
          config: jakartaConfig
        })
      )
    );
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
