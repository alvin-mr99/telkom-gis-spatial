import React from 'react';
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
}

interface CounterData {
    totalAsset: string;
    activeComponent: string;
    coverageArea: string;
}

const CounterTab: React.FC = () => {
    const metrics: MetricCard[] = [
        {
            id: '1',
            title: 'SMS Revenue',
            value: '2.4M',
            change: '+12%',
            changeType: 'positive',
            icon: <TrendingUp className="w-5 h-5" />,
            color: 'blue'
        },
        {
            id: '2',
            title: 'Network Utilization',
            value: '87%',
            change: '+5%',
            changeType: 'positive',
            icon: <Signal className="w-5 h-5" />,
            color: 'purple'
        },
        {
            id: '3',
            title: 'Customer Count',
            value: '45.2K',
            change: '+8%',
            changeType: 'positive',
            icon: <Users className="w-5 h-5" />,
            color: 'pink'
        },
        {
            id: '4',
            title: 'Bandwidth Usage',
            value: '1.2TB',
            change: '+15%',
            changeType: 'positive',
            icon: <HardDrive className="w-5 h-5" />,
            color: 'orange'
        }
    ];

    const kpiMetrics: KPIMetric[] = [
        {
            name: 'Revenue Growth',
            current: '12.5%',
            target: '10%',
        },
        {
            name: 'Customer Satisfaction',
            current: '87%',
            target: '90%',
        },
        {
            name: 'Network Uptime',
            current: '99.8%',
            target: '99.5%',
        },
        {
            name: 'ARPU',
            current: '$45',
            target: '$50',
        },
        {
            name: 'Churn Rate',
            current: '2.1%',
            target: '2.6%',
        },
        {
            name: 'Market Share',
            current: '23%',
            target: '25%',
        },
    ];

    const counterData: CounterData = {
        totalAsset: '$2.4M',
        activeComponent: '$1.8M',
        coverageArea: '$0.6M'
    };

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

    // Simple chart data representation
    const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const chartValues = [2000, 2200, 2100, 2300, 2400, 2500];

    return (
        <div className="space-y-6">
            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className={`${getCardStyle(metric.color)} border rounded-lg p-3 hover:shadow-md transition-all duration-200`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className={`${getIconColor(metric.color)}`}>
                                {metric.icon}
                            </div>
                            <div className="flex items-center space-x-1">
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                <span className="text-xs font-medium text-green-600">
                                    {metric.change}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className={`text-xl font-bold ${getTextColor(metric.color)}`}>
                                {metric.value}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                {metric.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Historical Trend */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Historical Trend</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        6 Months
                    </span>
                </div>

                {/* Simple Chart Representation */}
                <div className="h-32 flex items-end justify-between space-x-2 mb-2">
                    {chartValues.map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div
                                className="w-full bg-blue-500 rounded-t-sm transition-all duration-300"
                                style={{
                                    height: `${(value / Math.max(...chartValues)) * 100}%`,
                                    minHeight: '4px'
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Chart Labels */}
                <div className="flex justify-between text-xs text-gray-500">
                    {chartMonths.map((month, index) => (
                        <span key={index}>{month}</span>
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>0</span>
                    <span>600</span>
                    <span>1200</span>
                    <span>1800</span>
                    <span>2400</span>
                </div>
            </div>

            {/* KPI Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI Analysis</h3>

                {/* Table Header */}
                <div className="grid grid-cols-3 gap-4 mb-3 pb-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Metric</span>
                    <span className="text-sm font-medium text-gray-600 text-center">Current</span>
                    <span className="text-sm font-medium text-gray-600 text-center">Target</span>
                </div>

                {/* KPI Rows */}
                <div className="space-y-3">
                    {kpiMetrics.map((kpi, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 items-center py-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full"></div>
                                <span className="text-sm text-gray-700">{kpi.name}</span>
                            </div>
                            <div className="text-center">
                                <span className="text-sm font-medium">
                                    {kpi.current}
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="text-sm text-gray-600">{kpi.target}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Total Asset</span>
                        <span className="font-semibold text-gray-900">{counterData.coverageArea}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Active Components</span>
                        <span className="font-semibold text-gray-900">{counterData.activeComponent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Coverage area</span>
                        <span className="font-semibold text-green-600">{counterData.coverageArea}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterTab;