// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {injectComponents} from '@kepler.gl/components';
import CustomSidebarFactory from './components/side-bar';
import CustomPanelHeaderFactory from './components/panel-header';

// Inject custom components into KeplerGl with correct factory names
const KeplerGl = injectComponents([
  [CustomSidebarFactory, 'SidebarFactory'],
  [CustomPanelHeaderFactory, 'PanelHeaderFactory']
]);

export default KeplerGl;