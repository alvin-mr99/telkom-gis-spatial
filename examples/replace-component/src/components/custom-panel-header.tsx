import React, { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Layers, ChevronDown, Search, PanelLeft } from 'lucide-react';

// Mock data untuk dropdown options
const regionOptions = ['Region 1', 'Region 2', 'Region 3', 'Region 4'];
const witelOptions = ['Witel Jakarta', 'Witel Bandung', 'Witel Surabaya', 'Witel Medan'];
const stoOptions = ['STO Jakarta Pusat', 'STO Jakarta Barat', 'STO Jakarta Timur', 'STO Jakarta Selatan'];
const dailyOptions = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
const kpiOptions = ['Throughput', 'Latency', 'Packet Loss', 'Availability'];

function ModernKeplerPanel() {
    const [region, setRegion] = useState('Region');
    const [witel, setWitel] = useState('Witel');
    const [sto, setSto] = useState('STO');
    const [daily, setDaily] = useState('Daily');
    const [kpi, setKpi] = useState('KPI');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const IconButton = ({ icon: Icon, active = false, onClick = undefined, title = "" }) => (
        <button 
            onClick={onClick}
            title={title}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                active
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-gray-800 border border-gray-200'
            }`}>
            <Icon size={16} />
        </button>
    );

    const Dropdown = ({ id, value, onChange, options = [], placeholder = "Select..." }) => {
        const dropdownRef = useRef<HTMLDivElement>(null);
        const isOpen = openDropdown === id;

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setOpenDropdown(null);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                return () => document.removeEventListener('mousedown', handleClickOutside);
            }
        }, [isOpen]);

        const toggleDropdown = (e: React.MouseEvent) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : id);
        };

        const selectOption = (option: string) => {
            onChange(option);
            setOpenDropdown(null);
        };

        return (
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={toggleDropdown}
                    className="px-3 py-1.5 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-white hover:border-gray-300 transition-all duration-200 flex items-center gap-1.5 min-w-[90px] justify-between shadow-sm"
                >
                    <span className="truncate">{value}</span>
                    <ChevronDown 
                        size={14} 
                        className={`opacity-50 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                </button>
                
                {isOpen && (
                    <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-48 overflow-y-auto">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => selectOption(option)}
                                className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const DatePicker = ({ value, onChange, placeholder }) => {
        return (
            <div className="relative">
                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="px-3 py-1.5 pl-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm min-w-[110px]"
                    placeholder={placeholder}
                />
                <Calendar size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 opacity-40 pointer-events-none text-gray-600" />
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/80 rounded-xl shadow-lg">
                <div className="px-4 py-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Icon Buttons Group */}
                        {/* <div className="flex items-center gap-1.5 bg-gray-50/80 rounded-lg p-1.5 border border-gray-200/60">
                            <IconButton 
                                icon={PanelLeft} 
                                onClick={() => console.log('Toggle panel')}
                                title="Toggle Panel"
                            />
                            <IconButton icon={MapPin} active={true} title="Map View" />
                            <IconButton icon={Layers} title="Layers" />
                            <IconButton 
                                icon={() => <div className="w-3.5 h-3.5 rounded border-2 border-current"></div>} 
                                title="Rectangle Tool"
                            />
                            <IconButton 
                                icon={() => <div className="w-3.5 h-3.5 rounded-full border-2 border-current"></div>} 
                                title="Circle Tool"
                            />
                        </div> */}

                        {/* Dropdowns - Baris Pertama */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <IconButton icon={MapPin} active={true} title="Map View" />
                            <IconButton icon={Layers} title="Layers" />
                            <Dropdown 
                                id="region"
                                value={region} 
                                onChange={setRegion} 
                                options={regionOptions}
                            />
                            <Dropdown 
                                id="witel"
                                value={witel} 
                                onChange={setWitel} 
                                options={witelOptions}
                            />
                            <Dropdown 
                                id="sto"
                                value={sto} 
                                onChange={setSto} 
                                options={stoOptions}
                            />
                            <Dropdown 
                                id="daily"
                                value={daily} 
                                onChange={setDaily} 
                                options={dailyOptions}
                            />

                            {/* Date Pickers */}
                            <DatePicker value={startDate} onChange={setStartDate} placeholder="Start" />
                            <DatePicker value={endDate} onChange={setEndDate} placeholder="End" />

                            {/* KPI Dropdown */}
                            <Dropdown 
                                id="kpi"
                                value={kpi} 
                                onChange={setKpi} 
                                options={kpiOptions}
                            />

                            {/* Search Button */}
                            <button 
                                onClick={() => {
                                    console.log('Search:', { region, witel, sto, daily, kpi, startDate, endDate });
                                }}
                                className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ml-1"
                            >
                                <Search size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModernKeplerPanel;