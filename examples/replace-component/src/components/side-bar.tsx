// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {SidebarFactory, Icons} from '@kepler.gl/components';
import styled from 'styled-components';
import {SideBarProps} from '@kepler.gl/components';

const StyledSideBarContainer = styled.div<{$isOpen: boolean}>`
  /* Clean white sidebar */
  .side-panel--container {
    background: ${props => props.$isOpen ? '#ffffff' : 'transparent'} !important;
    border-right: ${props => props.$isOpen ? '1px solid #e5e7eb' : 'none'} !important;
    box-shadow: ${props => props.$isOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'} !important;
    min-width: ${props => props.$isOpen ? '380px' : '0'} !important;
    max-width: ${props => props.$isOpen ? '420px' : '0'} !important;
    overflow: ${props => props.$isOpen ? 'visible' : 'hidden'} !important;
    transition: all 0.3s ease !important;
    
    /* When closed, completely hide */
    ${props => !props.$isOpen && `
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      border: none !important;
      box-shadow: none !important;
      background: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
    `}
  }
  
  /* Hide all content when closed */
  ${props => !props.$isOpen && `
    .side-panel--container * {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
  `}
  
  /* White clean header */
  .side-panel__header {
    background: #ffffff !important;
    border-bottom: 1px solid #e5e7eb !important;
    padding: 20px !important;
  }
  
  /* Clean white tabs */
  .side-panel__tab {
    background: #ffffff !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 8px !important;
    color: #6b7280 !important;
    font-weight: 500 !important;
    font-size: 13px !important;
    margin: 0 3px !important;
    padding: 10px 12px !important;
    transition: all 0.2s ease !important;
    min-width: 55px !important;
    min-height: 55px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
    gap: 4px !important;
  }
  
  .side-panel__tab:hover {
    background: #f9fafb !important;
    border-color: #3b82f6 !important;
    color: #3b82f6 !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1) !important;
  }
  
  .side-panel__tab.active {
    background: #3b82f6 !important;
    border-color: #3b82f6 !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2) !important;
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
  background: #ffffff;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1001;
  
  &:hover {
    background: #f9fafb;
    border-color: #3b82f6;
    color: #3b82f6;
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(59, 130, 246, 0.2);
  }
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
    transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  }
`;

interface ToggleButtonProps {
  onClick: () => void;
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
          onClick();
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
