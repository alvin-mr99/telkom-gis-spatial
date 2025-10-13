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
          onClick(e as any);
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
