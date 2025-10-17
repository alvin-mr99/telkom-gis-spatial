import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import MapControlsPanel from './map-controls-panel';

const BottomMapControls: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
            {/* Toggle Button */}
            <div className="flex justify-center mb-2">
                <button
                    onClick={handleToggle}
                    className="bg-white/10 backdrop-blur-xl border border-gray-200/80 shadow-lg rounded-t-lg px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-xl"
                    title={isOpen ? 'Hide Map Controls' : 'Show Map Controls'}
                >
                    {isOpen ? (
                        <ChevronDown size={16} className="text-gray-600" />
                    ) : (
                        <ChevronUp size={16} className="text-gray-600" />
                    )}
                </button>
            </div>

            {/* Map Controls Panel */}
            <div 
                className={`w-96 transition-all duration-300 ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                }`}
            >
                <MapControlsPanel />
            </div>
        </div>
    );
};

export default BottomMapControls;