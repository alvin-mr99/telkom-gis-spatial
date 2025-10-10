// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {SidebarFactory, Icons} from '@kepler.gl/components';
import styled from 'styled-components';
import {SideBarProps} from '@kepler.gl/components';

const StyledSideBarContainer = styled.div`
  /* Modern sidebar container with enhanced light theme */
  .side-panel--container {
    /* Remove transform scaling for better responsiveness */
    transform: none;
    height: 100%;
    padding: 0;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-right: 1px solid #e1e5e9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);
    min-width: 360px;
    max-width: 420px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* Enhanced header styling */
  .side-panel__header {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-bottom: 1px solid #e1e5e9;
    padding: 24px 20px;
    backdrop-filter: blur(10px);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    border: 1px solid #e1e5e9;
  }

  /* Panel header improvements */
  .side-panel__panel-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    border: 1px solid #e1e5e9;
    overflow: hidden;
  }

  .layer-panel__header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #1a202c;
    font-weight: 600;
    padding: 16px 20px;
    border-bottom: 1px solid #e1e5e9;
  }

  /* Tab styling enhancements */
  .side-panel__tab {
    background: transparent;
    border: 2px solid transparent;
    border-radius: 12px;
    color: #64748b;
    font-weight: 500;
    font-size: 14px;
    margin: 0 4px;
    padding: 12px 16px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .side-panel__tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  .side-panel__tab:hover {
    background: #e3f2fd;
    border-color: #007bff;
    color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .side-panel__tab:hover::before {
    left: 100%;
  }

  .side-panel__tab.active {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    border-color: #007bff;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    font-weight: 600;
  }

  /* Content area styling */
  .side-panel__content {
    background: #ffffff;
    padding: 20px;
    overflow-y: auto;
  }
`;

const StyledCloseButton = styled.div`
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: #ffffff;
  display: flex;
  height: 48px;
  position: absolute;
  top: 0;
  width: 48px;
  right: 0;
  border-radius: 0 0 0 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
  cursor: pointer;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;

  /* Hover effect with enhanced animation */
  &:hover {
    background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
    transform: translateX(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Active state */
  &:active {
    transform: translateX(-2px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  /* Icon container */
  .close-icon {
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Tooltip effect */
  &::before {
    content: attr(data-tooltip);
    position: absolute;
    right: 56px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    pointer-events: none;
    white-space: nowrap;
    backdrop-filter: blur(10px);
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-4px);
  }
`;

interface CloseButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const CloseButtonFactory = () => {
  const CloseButton: React.FC<CloseButtonProps> = ({onClick, isOpen}) => (
    <StyledCloseButton
      className="side-bar__close"
      onClick={onClick}
      data-tooltip={isOpen ? 'Close Panel' : 'Open Panel'}
      role="button"
      tabIndex={0}
      aria-label={isOpen ? 'Close side panel' : 'Open side panel'}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="close-icon">
        <Icons.ArrowRight
          height="20px"
          style={{
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </StyledCloseButton>
  );
  return CloseButton;
};

// Custom sidebar will render kepler.gl default side bar
// adding a wrapper component to edit its style
function CustomSidebarFactory(CloseButton: ReturnType<typeof CloseButtonFactory>) {
  const SideBar = SidebarFactory(CloseButton);
  const CustomSidebar: React.FC<SideBarProps> = props => (
    <StyledSideBarContainer>
      <SideBar {...props} />
    </StyledSideBarContainer>
  );
  return CustomSidebar;
}

// You can add custom dependencies to your custom factory
CustomSidebarFactory.deps = [CloseButtonFactory];

export default CustomSidebarFactory;
