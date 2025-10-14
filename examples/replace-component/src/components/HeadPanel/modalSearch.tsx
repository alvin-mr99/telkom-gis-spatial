import React, { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';

interface SearchResult {
    id: string;
    name: string;
    type: string;
    description?: string;
}

interface ModalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalSearch: React.FC<ModalSearchProps> = ({
    isOpen,
    onClose
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sample data untuk simulasi search
    const sampleData: SearchResult[] = [
        { id: '1', name: 'Witel Jakarta Pusat', type: 'Witel', description: 'Divisi - Regional Jakarta' },
        { id: '2', name: 'Witel Jakarta Barat', type: 'Witel', description: 'Divisi - Regional Jakarta' },
        { id: '3', name: 'Witel Jakarta Timur', type: 'Witel', description: 'Divisi - Regional Jakarta' },
        { id: '4', name: 'Witel Jakarta Selatan', type: 'Witel', description: 'Divisi - Regional Jakarta' },
        { id: '5', name: 'Witel Bandung', type: 'Witel', description: 'Divisi - Regional Bandung' },
        { id: '6', name: 'STO Jakarta Pusat', type: 'STO', description: 'Service Technical Office' },
        { id: '7', name: 'STO Jakarta Barat', type: 'STO', description: 'Service Technical Office' },
        { id: '8', name: 'Region 1', type: 'Region', description: 'Regional Area 1' },
        { id: '9', name: 'Region 2', type: 'Region', description: 'Regional Area 2' },
    ];

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim()) {
            setIsSearching(true);
            // Simulasi delay untuk search
            const timer = setTimeout(() => {
                const filtered = sampleData.filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.type.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setSearchResults(filtered);
                setIsSearching(false);
            }, 300);

            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
            setIsSearching(false);
        }
    }, [searchQuery]);

    const handleSelectResult = (result: SearchResult) => {
        console.log('Selected:', result);
        setSearchQuery('');
        setSearchResults([]);
        onClose();
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
            <div className="bg-white rounded-lg shadow-xl w-96 max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Global Search</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for regions, witel, STO..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <X size={16} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
                        {isSearching ? (
                            <div className="p-4 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-2 text-sm">Searching...</p>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <>
                                <div className="p-3 bg-gray-50 border-b border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {searchResults.map((result) => (
                                        <button
                                            key={result.id}
                                            onClick={() => handleSelectResult(result)}
                                            className="w-full p-3 text-left hover:bg-blue-50 transition-colors group"
                                        >
                                            <div className="flex items-start space-x-3">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                                    <span className="text-xs font-medium text-blue-600">
                                                        {result.type.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                        {result.name}
                                                    </p>
                                                    {result.description && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {result.description}
                                                        </p>
                                                    )}
                                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                                                        {result.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                <p className="text-sm">No results found for "{searchQuery}"</p>
                                <p className="text-xs mt-1">Try searching for regions, witel, or STO</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {!searchQuery && (
                    <div className="p-6 text-center text-gray-500">
                        <Search size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Start typing to search</p>
                        <p className="text-xs mt-1">Search for regions, witel, STO, and more</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalSearch;