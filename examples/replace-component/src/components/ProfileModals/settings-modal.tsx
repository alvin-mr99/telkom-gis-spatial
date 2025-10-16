import React, { useState } from 'react';
import { X, Bell, Globe, Moon, Lock, Shield, Eye, Database } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-inter-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-md p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* General Settings */}
          <div className="mb-4">
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5 flex items-center gap-2">
              <Globe size={14} className="text-blue-500" />
              General Settings
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2.5">
                  <Bell size={14} className="text-gray-500" />
                  <div>
                    <p className="text-xs font-inter-medium text-gray-800">Notifications</p>
                    <p className="text-[10px] font-inter-normal text-gray-500">Enable push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2.5">
                  <Moon size={14} className="text-gray-500" />
                  <div>
                    <p className="text-xs font-inter-medium text-gray-800">Dark Mode</p>
                    <p className="text-[10px] font-inter-normal text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2.5">
                  <Database size={14} className="text-gray-500" />
                  <div>
                    <p className="text-xs font-inter-medium text-gray-800">Auto Save</p>
                    <p className="text-[10px] font-inter-normal text-gray-500">Automatically save changes</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoSave ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      autoSave ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="mb-4">
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5 flex items-center gap-2">
              <Globe size={14} className="text-blue-500" />
              Language & Region
            </h3>
            <div className="p-2.5 bg-gray-50 rounded-md">
              <label className="text-[10px] font-inter-medium text-gray-500 mb-1 block">Language</label>
              <select className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-inter-normal focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English (US)</option>
                <option>Bahasa Indonesia</option>
                <option>中文 (Chinese)</option>
              </select>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="mb-4">
            <h3 className="text-xs font-inter-semibold text-gray-700 mb-2.5 flex items-center gap-2">
              <Shield size={14} className="text-blue-500" />
              Privacy & Security
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors text-left">
                <Lock size={14} className="text-gray-500" />
                <div>
                  <p className="text-xs font-inter-medium text-gray-800">Change Password</p>
                  <p className="text-[10px] font-inter-normal text-gray-500">Update your password</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors text-left">
                <Eye size={14} className="text-gray-500" />
                <div>
                  <p className="text-xs font-inter-medium text-gray-800">Privacy Settings</p>
                  <p className="text-[10px] font-inter-normal text-gray-500">Manage your privacy preferences</p>
                </div>
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
            <p className="text-[10px] font-inter-normal text-gray-600 mb-0.5">Telkom GIS Spatial Platform</p>
            <p className="text-xs font-inter-semibold text-gray-800">Version 2.6.0</p>
            <p className="text-[10px] font-inter-normal text-gray-500 mt-1.5">© 2025 Telkom Indonesia. All rights reserved.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-xs font-inter-medium"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition-colors text-xs font-inter-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
