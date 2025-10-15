import React from 'react';

interface Project {
    id: string;
    name: string;
    status: 'On Track' | 'Delayed' | 'Ahead';
    progress: number;
    dueDate: string;
}

interface CounterData {
    totalBudget: string;
    spent: string;
    remaining: string;
}

const BusinessTab: React.FC = () => {
    const projects: Project[] = [
        {
            id: '1',
            name: 'Fiber Expansion Q3',
            status: 'On Track',
            progress: 75,
            dueDate: '2024-09-30'
        },
        {
            id: '2',
            name: 'STO Modernization',
            status: 'Delayed',
            progress: 45,
            dueDate: '2024-10-15'
        },
        {
            id: '3',
            name: 'Customer Migration',
            status: 'Ahead',
            progress: 90,
            dueDate: '2024-09-20'
        }
    ];

    const counterData: CounterData = {
        totalBudget: '$2.4M',
        spent: '$1.8M',
        remaining: '$0.6M'
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Track':
                return 'bg-green-100 text-green-700';
            case 'Delayed':
                return 'bg-red-100 text-red-700';
            case 'Ahead':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Active Projects Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-gray-900 text-sm">{project.name}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>{project.progress}% Complete</span>
                                <span>Due: {project.dueDate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Budget Summary */}
            <div>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Total Budget</span>
                        <span className="font-semibold text-gray-900">{counterData.totalBudget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Spent</span>
                        <span className="font-semibold text-gray-900">{counterData.spent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Remaining</span>
                        <span className="font-semibold text-green-600">{counterData.remaining}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessTab;