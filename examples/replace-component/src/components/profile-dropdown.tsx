import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import ProfileModal from './ProfileModals/profile-modal';
import SettingsModal from './ProfileModals/settings-modal';
import HelpSupportModal from './ProfileModals/help-support-modal';
import LogoutConfirmModal from './ProfileModals/logout-confirm-modal';

interface ProfileDropdownProps {
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user data from localStorage
  const userDataString = localStorage.getItem('telkom_gis_user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const userEmail = userData?.email || 'user@telkom.com';
  
  // Extract name from email (before @)
  const userName = userEmail.split('@')[0].replace(/[._-]/g, ' ').split(' ').map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Get initials for avatar
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('telkom_gis_auth');
    localStorage.removeItem('telkom_gis_user');
    setIsOpen(false);
    onLogout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/95 hover:bg-white border border-gray-200 rounded-md transition-all duration-200 shadow-sm hover:shadow-md group"
      >
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-[10px] shadow-sm">
          {initials}
        </div>
        
        {/* User Info */}
        <div className="flex flex-col items-start min-w-[110px]">
          <span className="text-xs font-inter-medium text-gray-800 leading-tight">
            {userName}
          </span>
          <span className="text-[10px] font-inter-normal text-gray-500 leading-tight">
            {userEmail.length > 16 ? userEmail.slice(0, 16) + '...' : userEmail}
          </span>
        </div>
        
        {/* Chevron Icon */}
        <ChevronDown 
          size={12} 
          className={`text-gray-500 transition-transform duration-200 ml-1 opacity-50 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-xl z-[10000] overflow-hidden animate-fadeIn">
          
          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowProfileModal(true);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-xs font-inter-normal text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 group"
            >
              <User size={14} className="text-gray-500 group-hover:text-blue-600" />
              <span className="font-inter-medium">My Profile</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setShowSettingsModal(true);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-xs font-inter-normal text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 group"
            >
              <Settings size={14} className="text-gray-500 group-hover:text-blue-600" />
              <span className="font-inter-medium">Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setShowHelpModal(true);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-xs font-inter-normal text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 group"
            >
              <HelpCircle size={14} className="text-gray-500 group-hover:text-blue-600" />
              <span className="font-inter-medium">Help & Support</span>
            </button>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-200 py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="w-full px-3 py-2 flex items-center gap-2.5 text-xs font-inter-medium text-red-600 hover:bg-red-50 transition-colors duration-150 group"
            >
              <LogOut size={14} className="text-red-500 group-hover:text-red-600" />
              <span className="font-inter-semibold">Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      <HelpSupportModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
      <LogoutConfirmModal 
        isOpen={showLogoutConfirm} 
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ProfileDropdown;
