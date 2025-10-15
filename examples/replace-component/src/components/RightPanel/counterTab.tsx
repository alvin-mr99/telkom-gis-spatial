import React, { useState } from 'react';
import { TrendingUp, Users, Zap, HardDrive, Signal, DollarSign, Target } from 'lucide-react';

interface MetricCard {
    id: string;
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
    color: string;
}

interface KPIMetric {
    name: string;
    current: string;
    target: string;
    status: 'above' | 'below' | 'equal';
}

interface CounterData {
    totalAsset: string;
    activeComponent: string;
    coverageArea: string;
}

interface ChartDataPoint {
    month: string;
    value: number;
    label: string;
}

const CounterTab: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<'3M' | '6M' | '1Y'>('6M');
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    const metrics: MetricCard[] = [
        {
            id: '1',
            title: 'SMS Revenue',
            value: '2.4M',
            change: '+12%',
            changeType: 'positive',
            icon: <DollarSign className="w-4 h-4" />,
            color: 'blue'
        },
        {
            id: '2',
            title: 'Network Utilization',
            value: '87%',
            change: '+5%',
            changeType: 'positive',
            icon: <Signal className="w-4 h-4" />,
            color: 'purple'
        },
        {
            id: '3',
            title: 'Customer Count',
            value: '45.2K',
            change: '+8%',
            changeType: 'positive',
            icon: <Users className="w-4 h-4" />,
            color: 'pink'
        },
        {
            id: '4',
            title: 'Bandwidth Usage',
            value: '1.2TB',
            change: '+15%',
            changeType: 'positive',
            icon: <HardDrive className="w-4 h-4" />,
            color: 'orange'
        }
    ];

    const kpiMetrics: KPIMetric[] = [
        {
            name: 'Revenue Growth',
            current: '12.5%',
            target: '10%',
            status: 'above'
        },
        {
            name: 'Customer Satisfaction',
            current: '87%',
            target: '90%',
            status: 'below'
        },
        {
            name: 'Network Uptime',
            current: '99.8%',
            target: '99.5%',
            status: 'above'
        },
        {
            name: 'ARPU',
            current: '$45',
            target: '$50',
            status: 'below'
        },
        {
            name: 'Churn Rate',
            current: '2.1%',
            target: '2.6%',
            status: 'above'
        },
        {
            name: 'Market Share',
            current: '23%',
            target: '25%',
            status: 'below'
        },
    ];

    const counterData: CounterData = {
        totalAsset: '$2.4M',
        activeComponent: '1,847',
        coverageArea: '856 km²'
    };

    // Chart data for different periods
    const chartData = {
        '3M': [
            { month: 'Apr', value: 2100, label: '$2.1M' },
            { month: 'May', value: 7800, label: '$2.4M' },
            { month: 'Jun', value: 2650, label: '$2.7M' }
        ],
        '6M': [
            { month: 'Jan', value: 1800, label: '$1.8M' },
            { month: 'Feb', value: 2000, label: '$2.0M' },
            { month: 'Mar', value: 1950, label: '$1.9M' },
            { month: 'Apr', value: 2100, label: '$2.1M' },
            { month: 'May', value: 2400, label: '$2.4M' },
            { month: 'Jun', value: 2650, label: '$2.7M' }
        ],
        '1Y': [
            { month: 'Q1', value: 1600, label: '$1.6M' },
            { month: 'Q2', value: 1850, label: '$1.9M' },
            { month: 'Q3', value: 2100, label: '$2.1M' },
            { month: 'Q4', value: 2400, label: '$2.4M' }
        ]
    };

    const currentChartData = chartData[selectedPeriod];
    const maxValue = Math.max(...currentChartData.map(d => d.value));

    const getCardStyle = (color: string) => {
        const styles = {
            blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
            purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
            pink: 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200',
            orange: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
        };
        return styles[color] || styles.blue;
    };

    const getIconColor = (color: string) => {
        const colors = {
            blue: 'text-blue-600',
            purple: 'text-purple-600',
            pink: 'text-pink-600',
            orange: 'text-orange-600'
        };
        return colors[color] || colors.blue;
    };

    const getTextColor = (color: string) => {
        const colors = {
            blue: 'text-blue-700',
            purple: 'text-purple-700',
            pink: 'text-pink-700',
            orange: 'text-orange-700'
        };
        return colors[color] || colors.blue;
    };

    const getKPIStatusColor = (status: string) => {
        switch (status) {
            case 'above':
                return 'bg-green-100 text-green-700';
            case 'below':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getKPIIndicatorColor = (status: string) => {
        switch (status) {
            case 'above':
                return 'bg-green-500';
            case 'below':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4 font-inter">
            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 gap-2">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className={`${getCardStyle(metric.color)} border rounded-lg p-2 hover:shadow-md transition-all duration-200`}
                    >
                        <div className="flex items-start justify-between mb-1">
                            <div className={`${getIconColor(metric.color)}`}>
                                {metric.icon}
                            </div>
                            <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                <span className="text-xs font-inter-medium text-green-600">
                                    {metric.change}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className={`text-base font-inter-bold ${getTextColor(metric.color)}`}>
                                {metric.value}
                            </p>
                            <p className="text-xs font-inter-normal text-gray-600 mt-0.5">
                                {metric.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive Historical Trend Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-inter-semibold text-gray-900">Revenue Trend</h3>
                    <div className="flex space-x-1">
                        {(['3M', '6M', '1Y'] as const).map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-2.5 py-1 text-xs font-inter-medium rounded transition-all ${selectedPeriod === period
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Chart Container */}
                <div className="relative">
                    {/* Chart Bars */}
                    <div className="h-48 flex items-end justify-between gap-3 mb-3 relative">
                        {/* Background grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-full border-t border-gray-200"></div>
                            ))}
                        </div>

                        {currentChartData.map((dataPoint, index) => {
                            const height = (dataPoint.value / maxValue) * 100;
                            const isHovered = hoveredBar === index;

                            return (
                                <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                                    {/* Tooltip */}
                                    {isHovered && (
                                        <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                                            <div className="font-inter-semibold">{dataPoint.label}</div>
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    )}

                                    {/* Bar */}
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer ${isHovered
                                                ? 'bg-blue-600 shadow-lg'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                        style={{
                                            height: `${Math.max(height, 8)}%`,
                                            minHeight: '12px',
                                            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                                        }}
                                        onMouseEnter={() => setHoveredBar(index)}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* X-axis Labels */}
                    <div className="flex justify-between px-1">
                        {currentChartData.map((dataPoint, index) => (
                            <div key={index} className="flex-1 text-center">
                                <span className="text-xs font-inter-medium text-gray-600">{dataPoint.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span className="font-inter-normal">Monthly Revenue</span>
                </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div>
                <div className="space-y-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-xs font-inter-normal">Total Asset</span>
                        <span className="font-inter-semibold text-gray-900 text-xs">{counterData.totalAsset}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-xs font-inter-normal">Active Components</span>
                        <span className="font-inter-semibold text-blue-600 text-xs">{counterData.activeComponent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-xs font-inter-normal">Coverage Area</span>
                        <span className="font-inter-semibold text-green-600 text-xs">{counterData.coverageArea}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterTab;