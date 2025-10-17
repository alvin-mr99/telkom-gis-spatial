import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface PanelToggleButtonProps {
    isOpen: boolean;
    onToggle: () => void;
    side?: 'left' | 'right' | 'bottom';
    width?: number;
}

const PanelToggleButton: React.FC<PanelToggleButtonProps> = ({ 
    isOpen, 
    onToggle, 
    side = 'right',
    width = 320 
}) => {
    if (side === 'bottom') {
        return (
            <button
                onClick={onToggle}
                className="bg-white/10 backdrop-blur-xl border border-gray-200/80 shadow-lg rounded-t-lg px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-xl"
                title={isOpen ? 'Hide Panel' : 'Show Panel'}
            >
                {isOpen ? (
                    <ChevronDown size={16} className="text-gray-600" />
                ) : (
                    <ChevronUp size={16} className="text-gray-600" />
                )}
            </button>
        );
    }

    const isRightSide = side === 'right';
    
    // Perbaiki positioning untuk right panel
    const rightPosition = isOpen ? 'right-72' : 'right-4'; // right-72 = 288px (w-72), right-4 = 16px
    const leftPosition = isOpen ? 'left-72' : 'left-4';
    
    const position = isRightSide ? rightPosition : leftPosition;
    const roundedClass = isRightSide ? 'rounded-l-lg' : 'rounded-r-lg';
    
    return (
        <button
            onClick={onToggle}
            className={`fixed top-1/2 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-xl border border-gray-200/80 shadow-lg ${roundedClass} p-2 transition-all duration-300 hover:bg-white hover:shadow-xl ${position}`}
            title={isOpen ? 'Hide Panel' : 'Show Panel'}
        >
            {isRightSide ? (
                isOpen ? (
                    <ChevronRight size={16} className="text-gray-600" />
                ) : (
                    <ChevronLeft size={16} className="text-gray-600" />
                )
            ) : (
                isOpen ? (
                    <ChevronLeft size={16} className="text-gray-600" />
                ) : (
                    <ChevronRight size={16} className="text-gray-600" />
                )
            )}
        </button>
    );
};

export default PanelToggleButton;