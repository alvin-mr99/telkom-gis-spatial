import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Search, BarChart3, Filter, Edit, Palette } from 'lucide-react';
import ModalDate from './HeadPanel/modalDate';
import ModalSearch from './HeadPanel/modalSearch';
import ModalSpatialAnalysis from './HeadPanel/modalSpatialAnalysis';
import ModalMapStyle from './HeadPanel/modalMapStyle';

const regionOptions = ['Region 1', 'Region 2', 'Region 3', 'Region 4'];
const witelOptions = ['Witel Jakarta', 'Witel Bandung', 'Witel Surabaya', 'Witel Medan'];
const stoOptions = ['STO Jakarta Pusat', 'STO Jakarta Barat', 'STO Jakarta Timur', 'STO Jakarta Selatan'];
const dailyOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
const kpiOptions = ['Throughput', 'Latency', 'Packet Loss', 'Availability'];

interface ModernKeplerPanelProps {
    onToggleRightPanel?: () => void;
}

function ModernKeplerPanel({ onToggleRightPanel }: ModernKeplerPanelProps) {
    const [region, setRegion] = useState('Region');
    const [witel, setWitel] = useState('Witel');
    const [sto, setSto] = useState('STO');
    const [daily, setDaily] = useState('Daily');
    const [kpi, setKpi] = useState('KPI');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeIcon, setActiveIcon] = useState(null);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showSpatialModal, setShowSpatialModal] = useState(false);
    const [showMapStyleModal, setShowMapStyleModal] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    const IconButton = ({ icon: Icon, id, title, tooltipText, onClick, isActive }) => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            <div className="relative">
                <button
                    onClick={() => {
                        if (onClick) {
                            onClick();
                        } else {
                            setActiveIcon(activeIcon === id ? null : id);
                        }
                    }}
                    onMouseEnter={() => {
                        setHoveredIcon(id);
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        setHoveredIcon(null);
                        setShowTooltip(false);
                    }}
                    title={title}
                    className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 border border-gray-200
                        ${isActive || activeIcon === id
                            ? 'bg-blue-500 text-white shadow-md border-blue-500'
                            : 'bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800'}
                    `}
                >
                    <Icon size={14} />
                </button>
                
                {/* Tooltip */}
                {showTooltip && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-[10002]">
                        <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap">
                            {tooltipText}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const Dropdown = ({ id, value, onChange, options = [] }) => {
        const dropdownRef = useRef(null);
        const isOpen = openDropdown === id;

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setOpenDropdown(null);
                }
            };
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return () => document.removeEventListener('mousedown', handleClickOutside);
            }
        }, [isOpen]);

        const toggleDropdown = (e) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : id);
        };

        const selectOption = (option) => {
            onChange(option);
            setOpenDropdown(null);
        };

        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="px-3 py-1.5 bg-white/95 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:border-gray-300 transition-all flex items-center justify-between min-w-[75px]"
                >
                    <span className="truncate text-sm">{value}</span>
                    <ChevronDown size={12} className={`ml-2 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md z-50 max-h-32 overflow-y-auto">
                        {options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => selectOption(option)}
                                className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const DateButton = () => (
        <button
            onClick={() => setShowDateModal(true)}
            className="px-3 py-1.5 bg-white/95 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:border-gray-300 transition-all flex items-center min-w-[85px]"
        >
            <Calendar size={12} className="mr-1.5 opacity-50 text-gray-600" />
            <span className="text-sm">
                {startDate && endDate ? `${startDate} - ${endDate}` : 'Date'}
            </span>
        </button>
    );

    return (
        <>
            <div className="absolute left-1/2 -translate-x-1/2 z-50">
                <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-lg shadow-md px-3 py-2">
                    {/* Satu baris - Semua controls dalam satu baris */}
                    <div className="flex items-center justify-center gap-1.5">
                        <IconButton 
                            icon={BarChart3} 
                            id="chart" 
                            title="Dashboard Analysis"
                            tooltipText="Dashboard Analysis"
                            onClick={onToggleRightPanel}
                        />
                        <IconButton 
                            icon={Filter} 
                            id="filter" 
                            title="Spatial Analysis"
                            tooltipText="Filtering"
                            onClick={() => setShowSpatialModal(true)}
                            isActive={showSpatialModal}
                        />
                        <IconButton 
                            icon={Palette} 
                            id="palette" 
                            title="Map Style & Layers"
                            tooltipText="Map Style"
                            onClick={() => setShowMapStyleModal(true)}
                            isActive={showMapStyleModal}
                        />
                        <IconButton 
                            icon={Edit} 
                            id="edit" 
                            title="Map Editor"
                            tooltipText="Map Editor"
                        />
                        
                        <div className="w-px h-5 bg-gray-300 mx-1.5"></div>
                        
                        <Dropdown id="region" value={region} onChange={setRegion} options={regionOptions} />
                        <Dropdown id="witel" value={witel} onChange={setWitel} options={witelOptions} />
                        <Dropdown id="sto" value={sto} onChange={setSto} options={stoOptions} />
                        <Dropdown id="daily" value={daily} onChange={setDaily} options={dailyOptions} />
                        <DateButton />
                        <Dropdown id="kpi" value={kpi} onChange={setKpi} options={kpiOptions} />
                        
                        <button
                            onClick={() => setShowSearchModal(true)}
                            className="w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center shadow-md ml-1"
                        >
                            <Search size={14} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            <ModalDate
                isOpen={showDateModal}
                onClose={() => setShowDateModal(false)}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />

            <ModalSearch
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
            />

            <ModalSpatialAnalysis
                isOpen={showSpatialModal}
                onClose={() => setShowSpatialModal(false)}
            />

            <ModalMapStyle
                isOpen={showMapStyleModal}
                onClose={() => setShowMapStyleModal(false)}
            />
        </>
    );
}

export default ModernKeplerPanel;
