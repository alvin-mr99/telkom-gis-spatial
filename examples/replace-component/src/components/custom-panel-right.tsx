import React, { useState } from 'react';
import { X } from 'lucide-react';
import AnalysisTab from './RightPanel/analysisTab';
import BusinessTab from './RightPanel/bussinesTab';
import CounterTab from './RightPanel/counterTab';

interface CustomPanelRightProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomPanelRight: React.FC<CustomPanelRightProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'Counter' | 'Analysis' | 'Business'>('Business');

    const TabButton = ({ tab, children }: { tab: 'Counter' | 'Analysis' | 'Business'; children: React.ReactNode }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                activeTab === tab
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            {children}
        </button>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed top-16 right-4 bottom-20 w-72 bg-white/10 backdrop-blur-xl border border-gray-200/80 shadow-lg z-40 rounded-lg">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-3">
                    <h2 className="text-base font-semibold text-gray-900">Analysis Dashboard</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center gap-1 p-2">
                    <TabButton tab="Counter">Counter</TabButton>
                    <TabButton tab="Analysis">Analysis</TabButton>
                    <TabButton tab="Business">Business</TabButton>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3">
                    {activeTab === 'Business' && <BusinessTab />}
                    {activeTab === 'Counter' && <CounterTab />}
                    {activeTab === 'Analysis' && <AnalysisTab />}
                </div>
            </div>
        </div>
    );
};

export default CustomPanelRight;