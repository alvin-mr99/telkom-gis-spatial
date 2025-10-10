// SPDX-License-Identifier: MIT
// Error handling utilities for Kepler.gl

export const suppressKeplerErrors = () => {
  // Override console.error temporarily for Kepler.gl errors
  const originalError = console.error;
  
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Suppress specific Kepler.gl error messages
    const suppressedMessages = [
      'Failed to create a new dataset',
      'Error loading dataset',
      'Unable to load remote tileset',
      'MVT loading failed',
      'Vector tile error'
    ];
    
    const shouldSuppress = suppressedMessages.some(suppressedMsg => 
      message.includes(suppressedMsg)
    );
    
    if (!shouldSuppress) {
      originalError.apply(console, args);
    } else {
      // Log as warning instead
      console.warn('Suppressed Kepler.gl error:', ...args);
    }
  };
  
  // Return function to restore original error logging
  return () => {
    console.error = originalError;
  };
};

export const createSafeDatasetConfig = (dataset: any) => {
  return {
    ...dataset,
    options: {
      centerMap: true,
      keepExistingConfig: false,
      autoCreateLayers: true,
      readOnly: false,
      // Suppress error notifications
      suppressErrorNotifications: true
    }
  };
};