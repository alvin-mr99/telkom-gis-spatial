// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {PanelHeaderFactory} from '@kepler.gl/components';

// Custom Panel Header renders default panel header, changing its default props
// to avoid rendering any action items on the top right
export function CustomPanelHeaderFactory(): React.ComponentType<any> {
  const PanelHeader = PanelHeaderFactory();

  (PanelHeader as any).defaultProps = {
    ...(PanelHeader as any).defaultProps,
    actionItems: []
  };
  
  return PanelHeader;
}

export default CustomPanelHeaderFactory;