import React from 'react';
import styled from 'styled-components';
import {Icons} from '@kepler.gl/components';

const StyledSidePanel = styled.div`
  background: #ffffff !important;
  border-right: 1px solid #e5e7eb !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 380px;
  max-width: 420px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const PanelHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff !important;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const PanelTitle = styled.h3`
  color: #1f2937 !important;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelSubtitle = styled.p`
  color: #6b7280 !important;
  margin: 6px 0 0 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 16px 20px;
  background: #ffffff !important;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button<{$active?: boolean}>`
  background: ${props => props.$active ? '#3b82f6' : '#f9fafb'} !important;
  border: 1px solid ${props => props.$active ? '#3b82f6' : '#e5e7eb'} !important;
  border-radius: 6px !important;
  color: ${props => props.$active ? '#ffffff' : '#6b7280'} !important;
  cursor: pointer !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  padding: 10px 16px !important;
  transition: all 0.2s ease !important;
  flex: 1;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${props => props.$active ? '#2563eb' : '#f3f4f6'} !important;
    border-color: ${props => props.$active ? '#2563eb' : '#d1d5db'} !important;
    transform: translateY(-1px);
  }

  svg {
    width: 16px !important;
    height: 16px !important;
  }
`;

const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #ffffff !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 2px;
  }
`;

const Section = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
  background: #ffffff !important;
`;

const SectionTitle = styled.h4`
  color: #1f2937 !important;
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button<{$variant?: 'primary' | 'secondary' | 'success' | 'info'}>`
  background: ${props => {
    switch (props.$variant) {
      case 'success': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'info': return 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
      case 'secondary': return '#f9fafb';
      default: return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    }
  }} !important;
  border: ${props => props.$variant === 'secondary' ? '1px solid #d1d5db' : 'none'} !important;
  border-radius: 8px !important;
  color: ${props => props.$variant === 'secondary' ? '#374151' : '#ffffff'} !important;
  cursor: pointer !important;
  padding: 12px 16px !important;
  margin: 6px 0 !important;
  width: 100% !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  min-height: 44px !important;

  &:hover {
    background: ${props => {
      switch (props.$variant) {
        case 'success': return 'linear-gradient(135deg, #059669 0%, #047857 100%)';
        case 'info': return 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
        case 'secondary': return '#f3f4f6';
        default: return 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
      }
    }} !important;
    border-color: ${props => props.$variant === 'secondary' ? '#3b82f6' : 'transparent'} !important;
    color: ${props => props.$variant === 'secondary' ? '#3b82f6' : '#ffffff'} !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
  }

  svg {
    width: 16px !important;
    height: 16px !important;
  }
`;

const LayerCard = styled.div`
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  padding: 16px !important;
  margin: 8px 0 !important;
  transition: all 0.2s ease !important;

  &:hover {
    border-color: #d1d5db !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
  }
`;

const LayerName = styled.div`
  color: #1f2937 !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  margin-bottom: 4px !important;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LayerDescription = styled.div`
  color: #6b7280 !important;
  font-size: 12px !important;
  margin-bottom: 8px !important;
  line-height: 1.4;
`;

const LayerStatus = styled.span<{$status: string}>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  background: ${props => {
    switch (props.$status) {
      case 'active': return '#ecfdf5';
      case 'ready': return '#eff6ff';
      default: return '#fef3c7';
    }
  }} !important;
  color: ${props => {
    switch (props.$status) {
      case 'active': return '#047857';
      case 'ready': return '#1d4ed8';
      default: return '#92400e';
    }
  }} !important;
  border: 1px solid ${props => {
    switch (props.$status) {
      case 'active': return '#10b981';
      case 'ready': return '#3b82f6';
      default: return '#f59e0b';
    }
  }};
`;

interface CustomSidePanelProps {
  id?: string;
  height?: number;
  isActive?: boolean;
  onClick?: () => void;
  panels?: any[];
}

const CustomSidePanelFactory = () => {
  const CustomSidePanel: React.FC<CustomSidePanelProps> = ({
    id,
    height,
    isActive,
    onClick,
    panels
  }) => {
    const [activeTab, setActiveTab] = React.useState('data');

    const handleExportData = () => {
      console.log('Exporting data...');
    };

    const handleImportData = () => {
      console.log('Importing data...');
    };

    const handleAnalyzeData = () => {
      console.log('Analyzing data...');
    };

    const renderDataTab = () => (
      <>
        <Section>
          <SectionTitle>
            <Icons.Files height="16px" />
            Data Operations
          </SectionTitle>
          <ActionButton $variant="success" onClick={handleImportData}>
            <Icons.Upload height="16px" />
            Add Data
          </ActionButton>
          <ActionButton $variant="secondary" onClick={handleExportData}>
            <Icons.Share height="16px" />
            Export Map
          </ActionButton>
        </Section>

        <Section>
          <SectionTitle>
            <Icons.Layers height="16px" />
            Datasets
          </SectionTitle>
          <LayerCard>
            <LayerName>
              📍 Jakarta Points of Interest
            </LayerName>
            <LayerDescription>
              Point layer • 25 features • Tourism, Shopping, Recreation
            </LayerDescription>
            <LayerStatus $status="active">Active</LayerStatus>
          </LayerCard>
          <LayerCard>
            <LayerName>
              📡 Infrastructure Data
            </LayerName>
            <LayerDescription>
              Point layer • 25 telecom assets • Base stations, Fiber nodes
            </LayerDescription>
            <LayerStatus $status="ready">Ready</LayerStatus>
          </LayerCard>
        </Section>
      </>
    );

    const renderLayersTab = () => (
      <>
        <Section>
          <SectionTitle>
            <Icons.Layers height="16px" />
            Map Layers
          </SectionTitle>
          <ActionButton $variant="info">
            <Icons.Add height="16px" />
            Add Layer
          </ActionButton>
        </Section>

        <Section>
          <SectionTitle>Layer Blending</SectionTitle>
          <select style={{
            background: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            color: '#374151',
            fontSize: '13px',
            padding: '8px 12px',
            width: '100%'
          }}>
            <option value="normal">normal</option>
            <option value="multiply">multiply</option>
            <option value="screen">screen</option>
          </select>
        </Section>

        <Section>
          <SectionTitle>Map Overlay Blending</SectionTitle>
          <select style={{
            background: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            color: '#374151',
            fontSize: '13px',
            padding: '8px 12px',
            width: '100%'
          }}>
            <option value="normal">normal</option>
            <option value="multiply">multiply</option>
            <option value="screen">screen</option>
          </select>
        </Section>
      </>
    );

    const renderFiltersTab = () => (
      <Section>
        <SectionTitle>
          <Icons.FilterFunnel height="16px" />
          Data Filters
        </SectionTitle>
        <ActionButton $variant="secondary">
          <Icons.Add height="16px" />
          Add Filter
        </ActionButton>
      </Section>
    );

    const renderMapTab = () => (
      <>
        <Section>
          <SectionTitle>
            <Icons.CursorClick height="16px" />
            Base Map
          </SectionTitle>
          <ActionButton $variant="success">
            <Icons.Add height="16px" />
            Add Map Style
          </ActionButton>
        </Section>

        <Section>
          <SectionTitle>Map Style</SectionTitle>
          <LayerCard>
            <LayerName>🗺️ Voyager</LayerName>
            <LayerDescription>Light theme with streets and landmarks</LayerDescription>
            <LayerStatus $status="active">Active</LayerStatus>
          </LayerCard>
        </Section>
      </>
    );

    return (
      <StyledSidePanel style={{height}}>
        <PanelHeader>
          <PanelTitle>
            <span style={{fontSize: '20px'}}>🗺️</span>
            Telkom GIS Spatial
          </PanelTitle>
          <PanelSubtitle>
            Advanced geospatial intelligence platform
          </PanelSubtitle>
        </PanelHeader>

        <TabContainer>
          <Tab 
            $active={activeTab === 'data'} 
            onClick={() => setActiveTab('data')}
          >
            <Icons.Files height="16px" />
            Data
          </Tab>
          <Tab 
            $active={activeTab === 'layers'} 
            onClick={() => setActiveTab('layers')}
          >
            <Icons.Layers height="16px" />
            Layers
          </Tab>
          <Tab 
            $active={activeTab === 'filters'} 
            onClick={() => setActiveTab('filters')}
          >
            <Icons.FilterFunnel height="16px" />
            Filters
          </Tab>
          <Tab 
            $active={activeTab === 'map'} 
            onClick={() => setActiveTab('map')}
          >
            <Icons.CursorClick height="16px" />
            Map
          </Tab>
        </TabContainer>

        <TabContent>
          {activeTab === 'data' && renderDataTab()}
          {activeTab === 'layers' && renderLayersTab()}
          {activeTab === 'filters' && renderFiltersTab()}
          {activeTab === 'map' && renderMapTab()}
        </TabContent>
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
