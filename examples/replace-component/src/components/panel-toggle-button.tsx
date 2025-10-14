import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PanelToggleButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

const PanelToggleButton: React.FC<PanelToggleButtonProps> = ({ isOpen, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`fixed top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-xl border border-gray-200/80 shadow-lg rounded-l-lg p-2 transition-all duration-300 hover:bg-white hover:shadow-xl ${
                isOpen ? 'right-80' : 'right-0'
            }`}
            title={isOpen ? 'Hide Panel' : 'Show Panel'}
        >
            {isOpen ? (
                <ChevronRight size={16} className="text-gray-600" />
            ) : (
                <ChevronLeft size={16} className="text-gray-600" />
            )}
        </button>
    );
};

export default PanelToggleButton;