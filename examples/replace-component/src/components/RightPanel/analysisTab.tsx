import React from 'react';
import { BarChart3, Download, MapPin, Crosshair, Route } from 'lucide-react';

interface RecentAnalysisItem {
    id: string;
    type: string;
    location: string;
    time: string;
    count: number;
}

const AnalysisTab: React.FC = () => {
    const recentAnalysis: RecentAnalysisItem[] = [
        {
            id: '1',
            type: 'Radius Search',
            location: 'Jakarta Pusat',
            time: '10:30 AM',
            count: 156
        },
        {
            id: '2',
            type: 'Intersection',
            location: 'Bandung',
            time: '09:45 AM',
            count: 89
        },
        {
            id: '3',
            type: 'Proximity',
            location: 'Surabaya',
            time: '09:15 AM',
            count: 234
        }
    ];

    const getAnalysisIcon = (type: string) => {
        switch (type) {
            case 'Radius Search':
                return <MapPin className="w-4 h-4 text-blue-500" />;
            case 'Intersection':
                return <Crosshair className="w-4 h-4 text-purple-500" />;
            case 'Proximity':
                return <Route className="w-4 h-4 text-green-500" />;
            default:
                return <BarChart3 className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Recent Analysis Section */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis</h3>
                <div className="space-y-3">
                    {recentAnalysis.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg p-3 border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getAnalysisIcon(item.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 mb-1">{item.type}</h4>
                                        <p className="text-sm text-gray-600">{item.location}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {item.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analysis Tools Section */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Tools</h3>
                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-blue-50 hover:border-blue-300 transition-all group">
                        <BarChart3 className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                            Run New Analysis
                        </span>
                    </button>
                    
                    <button className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-green-50 hover:border-green-300 transition-all group">
                        <Download className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                            Export Results
                        </span>
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                    <div className="text-center">
                        <p className="text-xs text-blue-600 font-medium">Total Analysis</p>
                        <p className="text-xl font-bold text-blue-700">24</p>
                        <p className="text-xs text-blue-500">This week</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                    <div className="text-center">
                        <p className="text-xs text-green-600 font-medium">Data Points</p>
                        <p className="text-xl font-bold text-green-700">479</p>
                        <p className="text-xs text-green-500">Analyzed</p>
                    </div>
                </div>
            </div>

            {/* Analysis Types */}
            <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Available Analysis Types</h4>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-700">Radius Search</span>
                        </div>
                        <span className="text-xs text-gray-500">12 runs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                            <Crosshair className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-700">Intersection</span>
                        </div>
                        <span className="text-xs text-gray-500">8 runs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-100">
                        <div className="flex items-center space-x-2">
                            <Route className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">Proximity</span>
                        </div>
                        <span className="text-xs text-gray-500">4 runs</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisTab;