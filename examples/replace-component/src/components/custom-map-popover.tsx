// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {MapPopoverFactory} from '@kepler.gl/components';

interface Layer {
  id: string;
  [key: string]: any;
}

interface LayerHoverProp {
  layer?: Layer;
  [key: string]: any;
}

interface MapPopoverProps {
  layerHoverProp?: LayerHoverProp;
  [key: string]: any;
}

const CustomMapPopoverFactory = (...deps: any[]) => {
  const MapPopover = MapPopoverFactory(...deps);
  
  const MapPopoverWrapper: React.FC<MapPopoverProps> = (props) => {
    // Disable tooltip for point layer
    if (props.layerHoverProp?.layer?.id === 'point_layer') {
      return null;
    }
    return <MapPopover {...props} />;
  };
  
  return MapPopoverWrapper;
};

CustomMapPopoverFactory.deps = MapPopoverFactory.deps;

export default CustomMapPopoverFactory;