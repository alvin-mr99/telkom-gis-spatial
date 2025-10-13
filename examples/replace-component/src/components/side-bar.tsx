// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {SidebarFactory, Icons} from '@kepler.gl/components';
import styled from 'styled-components';
import {SideBarProps} from '@kepler.gl/components';

const StyledSideBarContainer = styled.div`
  /* Simple white background sidebar container */
  .side-panel--container {
    transform: none;
    height: 100%;
    padding: 0;
    background: #ffffff;
    border-right: 1px solid #e1e5e9;
    min-width: 360px;
    max-width: 420px;
  }

  /* Simple header styling */
  .side-panel__header {
    background: #ffffff;
    border-bottom: 1px solid #e1e5e9;
    padding: 24px 20px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  /* Panel content styling */
  .side-panel__panel {
    background: #ffffff;
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
    border: 1px solid #e1e5e9;
  }

  /* Panel header improvements */
  .side-panel__panel-header {
    background: #ffffff;
    border-bottom: 1px solid #e1e5e9;
    color: #1a202c;
    font-weight: 600;
    font-size: 15px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Layer panel styling */
  .layer-panel {
    background: #ffffff;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid #e1e5e9;
    overflow: hidden;
  }

  .layer-panel__header {
    background: #ffffff;
    color: #1a202c;
    font-weight: 600;
    padding: 16px 20px;
    border-bottom: 1px solid #e1e5e9;
  }

  /* Simple tab styling */
  .side-panel__tab {
    background: transparent;
    border: 2px solid transparent;
    border-radius: 12px;
    color: #64748b;
    font-weight: 500;
    font-size: 14px;
    margin: 0 4px;
    padding: 12px 16px;
  }

  .side-panel__tab:hover {
    background: #f8f9fa;
    color: #007bff;
  }

  .side-panel__tab.active {
    background: #007bff;
    border-color: #007bff;
    color: #ffffff;
    font-weight: 600;
  }
  
  .side-panel__tab svg {
    width: 18px !important;
    height: 18px !important;
    stroke-width: 2px !important;
    fill: currentColor !important;
    color: currentColor !important;
  }
  
  /* White panels */
  .side-panel__panel {
    background: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    margin: 8px 12px !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
  }
  
  .side-panel__panel:hover {
    border-color: #d1d5db !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }
  
  .side-panel__panel-header {
    background: #f9fafb !important;
    border-bottom: 1px solid #e5e7eb !important;
    color: #374151 !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    padding: 16px 20px !important;
  }
  
  .side-panel__content {
    background: #ffffff !important;
    padding: 20px !important;
    color: #374151 !important;
  }
`;

const StyledToggleButton = styled.div<{$isOpen: boolean}>`
  position: fixed;
  top: 20px;
  left: ${props => props.$isOpen ? '400px' : '20px'};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007bff;
  color: #ffffff;
  display: flex;
  height: 48px;
  position: absolute;
  top: 0;
  width: 48px;
  right: 0;
  border-radius: 0 0 0 12px;
  cursor: pointer;
  z-index: 1000;

  /* Simple hover effect */
  &:hover {
    background: #0056b3;
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  /* Icon container */
  .close-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface CloseButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
}

const ToggleButtonFactory = () => {
  const ToggleButton: React.FC<ToggleButtonProps> = ({onClick, isOpen}) => (
    <StyledToggleButton
      $isOpen={isOpen}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? 'Hide sidebar' : 'Show sidebar'}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      }}
    >
      <Icons.ArrowRight />
    </StyledToggleButton>
  );
  return ToggleButton;
};

function CustomSidebarFactory(ToggleButton: ReturnType<typeof ToggleButtonFactory>) {
  const SideBar = SidebarFactory(ToggleButton);
  
  const CustomSidebar: React.FC<SideBarProps> = props => {
    const isOpen = props.width > 0;
    
    return (
      <StyledSideBarContainer $isOpen={isOpen}>
        <SideBar {...props} />
      </StyledSideBarContainer>
    );
  };
  
  return CustomSidebar;
}

CustomSidebarFactory.deps = [ToggleButtonFactory];
export default CustomSidebarFactory;
