import React from 'react';
import styled from 'styled-components';
import {Icons} from '@kepler.gl/components';
import {CustomSidePanelProps} from '../types';

const StyledSidePanel = styled.div`
  background-color: #29323c;
  border-right: 1px solid #3a414c;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const PanelHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #3a414c;
  background-color: #242730;
`;

const PanelTitle = styled.h3`
  color: #ffffff;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const PanelSubtitle = styled.p`
  color: #8f9ba8;
  margin: 5px 0 0 0;
  font-size: 12px;
`;

const CustomFeatureSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #3a414c;
`;

const FeatureTitle = styled.h4`
  color: #ffffff;
  margin: 0 0 15px 0;
  font-size: 14px;
  font-weight: 500;
`;

const FeatureButton = styled.button`
  background-color: #1f7cf4;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 8px 16px;
  margin: 5px 0;
  width: 100%;
  font-size: 12px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0f5cbd;
  }

  &:active {
    background-color: #0e52a8;
  }
`;

const LayersList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const LayerItem = styled.div`
  background-color: #3a414c;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
  color: #ffffff;
`;

const CustomSidePanelFactory = () => {
  const CustomSidePanel: React.FC<CustomSidePanelProps> = ({
    id,
    height,
    isActive,
    onClick,
    panels
  }) => {
    const handleExportData = () => {
      console.log('Exporting data...');
      // Add export functionality here
    };

    const handleImportData = () => {
      console.log('Importing data...');
      // Add import functionality here
    };

    const handleAnalyzeData = () => {
      console.log('Analyzing data...');
      // Add analysis functionality here
    };

    return (
      <StyledSidePanel style={{height}}>
        <PanelHeader>
          <PanelTitle>Kepler.gl Custom Panel</PanelTitle>
          <PanelSubtitle>Enhanced geospatial data visualization</PanelSubtitle>
        </PanelHeader>

        <CustomFeatureSection>
          <FeatureTitle>Data Operations</FeatureTitle>
          <FeatureButton onClick={handleImportData}>
            <Icons.Files height="14px" />
            <span style={{marginLeft: '8px'}}>Import Dataset</span>
          </FeatureButton>
          <FeatureButton onClick={handleExportData}>
            <Icons.Share height="14px" />
            <span style={{marginLeft: '8px'}}>Export Map</span>
          </FeatureButton>
          <FeatureButton onClick={handleAnalyzeData}>
            <Icons.LineChart height="14px" />
            <span style={{marginLeft: '8px'}}>Data Analysis</span>
          </FeatureButton>
        </CustomFeatureSection>

        <LayersList>
          <FeatureTitle>Map Layers</FeatureTitle>
          <LayerItem>
            <div>Sample Tree Data</div>
            <div style={{fontSize: '11px', color: '#8f9ba8', marginTop: '4px'}}>
              Point layer • 2 features
            </div>
          </LayerItem>
          <LayerItem>
            <div>Base Map - Voyager</div>
            <div style={{fontSize: '11px', color: '#8f9ba8', marginTop: '4px'}}>
              Mapbox style • Active
            </div>
          </LayerItem>
        </LayersList>
      </StyledSidePanel>
    );
  };

  CustomSidePanel.defaultProps = {
    id: 'customSidePanel',
    isActive: true,
    panels: []
  };

  return CustomSidePanel;
};

export default CustomSidePanelFactory;