import React from 'react';
import styled from 'styled-components';
import {Icons} from '@kepler.gl/components';
import {CustomSidePanelProps} from '../types';

const StyledSidePanel = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-right: 1px solid #e1e5e9;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 360px;
  max-width: 420px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const PanelHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #e1e5e9;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PanelTitle = styled.h3`
  color: #1a202c;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelSubtitle = styled.p`
  color: #64748b;
  margin: 8px 0 0 0;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.025em;
  line-height: 1.5;
`;

const CustomFeatureSection = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #e1e5e9;
  background: #ffffff;
`;

const FeatureTitle = styled.h4`
  color: #1a202c;
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.025em;
`;

const FeatureButton = styled.button`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  padding: 16px 20px;
  margin: 10px 0;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 48px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
  }

  &:hover::before {
    left: 100%;
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  &:nth-child(2) {
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);
  }

  &:nth-child(2):hover {
    background: linear-gradient(135deg, #1e7e34 0%, #155724 100%);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  }

  &:nth-child(3) {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.25);
  }

  &:nth-child(3):hover {
    background: linear-gradient(135deg, #138496 0%, #0f6674 100%);
    box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
  }

  &:nth-child(4) {
    background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
    box-shadow: 0 4px 12px rgba(255, 193, 7, 0.25);
    color: #212529;
  }

  &:nth-child(4):hover {
    background: linear-gradient(135deg, #e0a800 0%, #d39e00 100%);
    box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
  }
`;

const LayersList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
`;

const LayerItem = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  color: #1a202c;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #28a745, #17a2b8);
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-color: #007bff;
    transform: translateY(-4px) translateX(4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  .layer-name {
    font-weight: 600;
    font-size: 15px;
    color: #1a202c;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .layer-description {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .layer-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 8px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .status-active {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    border-color: #28a745;
  }

  .status-ready {
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    color: #0c5460;
    border-color: #17a2b8;
  }

  .status-available {
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    color: #856404;
    border-color: #ffc107;
  }

  /* Hover effect for status badges */
  &:hover .layer-status {
    transform: scale(1.05);
  }
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
          <PanelTitle>
            <span style={{fontSize: '24px'}}>🗺️</span>
            Telkom GIS Spatial
          </PanelTitle>
          <PanelSubtitle>
            Advanced geospatial intelligence platform for modern infrastructure
          </PanelSubtitle>
        </PanelHeader>

        <CustomFeatureSection>
          <FeatureTitle>
            <span style={{fontSize: '20px'}}>📊</span>
            Data Operations
          </FeatureTitle>
          <FeatureButton onClick={handleImportData} aria-label="Import new dataset">
            <Icons.Files height="18px" />
            <span>Import Dataset</span>
          </FeatureButton>
          <FeatureButton onClick={handleExportData} aria-label="Export current map">
            <Icons.Share height="18px" />
            <span>Export Map</span>
          </FeatureButton>
          <FeatureButton onClick={handleAnalyzeData} aria-label="Analyze current data">
            <Icons.LineChart height="18px" />
            <span>Data Analysis</span>
          </FeatureButton>
        </CustomFeatureSection>

        <LayersList>
          <FeatureTitle>
            <span style={{fontSize: '20px'}}>�️</span>
            Map Layers
          </FeatureTitle>
          <LayerItem>
            <div className="layer-name">
              <span>📍</span>
              Jakarta Points of Interest
            </div>
            <div className="layer-description">
              Point layer • 25 features • Tourism, Shopping, Recreation
            </div>
            <div className="layer-status status-active">Active</div>
          </LayerItem>
          <LayerItem>
            <div className="layer-name">
              <span>📡</span>
              Infrastructure Data
            </div>
            <div className="layer-description">
              Point layer • 25 telecom assets • Base stations, Fiber nodes
            </div>
            <div className="layer-status status-ready">Ready</div>
          </LayerItem>
          <LayerItem>
            <div className="layer-name">
              <span>👥</span>
              Population MVT
            </div>
            <div className="layer-description">
              Vector tiles • 88 kelurahan • Demographic data analysis
            </div>
            <div className="layer-status status-available">Available</div>
          </LayerItem>
          <LayerItem>
            <div className="layer-name">
              <span>🌍</span>
              Base Map - Voyager
            </div>
            <div className="layer-description">
              Mapbox style • Light theme • Streets and landmarks
            </div>
            <div className="layer-status status-active">Active</div>
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
