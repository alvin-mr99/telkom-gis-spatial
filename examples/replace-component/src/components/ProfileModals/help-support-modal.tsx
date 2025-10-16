import React, { useState } from 'react';
import { X, Book, MessageCircle, Mail, Phone, FileText, Video, Search } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const helpTopics = [
    { icon: Book, title: 'Getting Started Guide', desc: 'Learn the basics of using the platform' },
    { icon: Video, title: 'Video Tutorials', desc: 'Watch step-by-step video guides' },
    { icon: FileText, title: 'Documentation', desc: 'Comprehensive platform documentation' },
  ];

  const contactOptions = [
    { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team', status: 'Online' },
    { icon: Mail, title: 'Email Support', desc: 'support@telkom.com', status: '' },
    { icon: Phone, title: 'Phone Support', desc: '+62 21 1234-5678', status: '' },
  ];

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-inter-semibold text-white">Help & Support</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-md p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs font-inter-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Quick Help Topics */}
          <div className="mb-4">
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5">Quick Help Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {helpTopics.map((topic, index) => (
                <button
                  key={index}
                  className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-md hover:shadow-md transition-all text-left group"
                >
                  <topic.icon size={16} className="text-blue-500 mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-inter-semibold text-gray-800 mb-0.5">{topic.title}</p>
                  <p className="text-[10px] font-inter-normal text-gray-600">{topic.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-4">
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5">Frequently Asked Questions</h3>
            <div className="space-y-2">
              <details className="group bg-gray-50 rounded-md overflow-hidden">
                <summary className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-xs font-inter-medium text-gray-800 flex justify-between items-center">
                  How do I import vector tiles data?
                  <span className="group-open:rotate-180 transition-transform text-[10px]">▼</span>
                </summary>
                <div className="px-3 py-2 text-[10px] font-inter-normal text-gray-600 bg-white border-t border-gray-200">
                  You can import vector tiles by clicking the "Add Data" button and selecting your MVT file source URL. The platform supports remote tile servers and local files.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-md overflow-hidden">
                <summary className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-xs font-inter-medium text-gray-800 flex justify-between items-center">
                  How do I export my map visualization?
                  <span className="group-open:rotate-180 transition-transform text-[10px]">▼</span>
                </summary>
                <div className="px-3 py-2 text-[10px] font-inter-normal text-gray-600 bg-white border-t border-gray-200">
                  Click the "Share" button in the top panel, then select "Export Map" to download your visualization as PNG, SVG, or HTML.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-md overflow-hidden">
                <summary className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-xs font-inter-medium text-gray-800 flex justify-between items-center">
                  What are the supported file formats?
                  <span className="group-open:rotate-180 transition-transform text-[10px]">▼</span>
                </summary>
                <div className="px-3 py-2 text-[10px] font-inter-normal text-gray-600 bg-white border-t border-gray-200">
                  The platform supports CSV, GeoJSON, MVT (Vector Tiles), Shapefile, KML, and GeoParquet formats for spatial data.
                </div>
              </details>

              <details className="group bg-gray-50 rounded-md overflow-hidden">
                <summary className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-xs font-inter-medium text-gray-800 flex justify-between items-center">
                  How do I perform spatial analysis?
                  <span className="group-open:rotate-180 transition-transform text-[10px]">▼</span>
                </summary>
                <div className="px-3 py-2 text-[10px] font-inter-normal text-gray-600 bg-white border-t border-gray-200">
                  Use the Filter icon in the top panel to access spatial analysis tools including buffer, intersection, and proximity analysis.
                </div>
              </details>
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5">Contact Support</h3>
            <div className="space-y-2.5">
              {contactOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <option.icon size={14} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-inter-semibold text-gray-800">{option.title}</p>
                      {option.status && (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-inter-medium">
                          {option.status}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-inter-normal text-gray-600">{option.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-[10px] font-inter-semibold text-gray-700 mb-1.5">System Information</p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-inter-normal text-gray-600">
              <div>
                <span className="font-inter-medium">Platform:</span> Web
              </div>
              <div>
                <span className="font-inter-medium">Version:</span> 2.6.0
              </div>
              <div>
                <span className="font-inter-medium">Browser:</span> Chrome
              </div>
              <div>
                <span className="font-inter-medium">OS:</span> Windows 11
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-xs font-inter-medium"
          >
            Close
          </button>
          <button
            className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition-colors text-xs font-inter-medium"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportModal;
