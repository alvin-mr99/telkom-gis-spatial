// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {injectComponents} from '@kepler.gl/components';
import CustomPanelHeaderFactory from './components/panel-header';
import CustomPanelToggleFactory from './components/panel-toggle';
import CustomMapPopoverFactory from './components/custom-map-popover';
import CustomSidePanelFactory from './components/custom-side-panel';

// Inject custom components dengan side panel putih bersih
const KeplerGl = injectComponents([
  [CustomPanelHeaderFactory, 'PanelHeaderFactory'],
  [CustomPanelToggleFactory, 'PanelToggleFactory'],
  [CustomMapPopoverFactory, 'MapPopoverFactory'],
  [CustomSidePanelFactory, 'SidePanelFactory']
]);

export default KeplerGl;