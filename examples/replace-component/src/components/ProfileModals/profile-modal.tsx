import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Get user data from localStorage
  const userDataString = localStorage.getItem('telkom_gis_user');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const userEmail = userData?.email || 'user@telkom.com';
  
  // Extract name from email
  const userName = userEmail.split('@')[0].replace(/[._-]/g, ' ').split(' ').map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-inter-semibold text-white">My Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-md p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-inter-semibold text-xl shadow-lg mb-2">
              {initials}
            </div>
            <h3 className="text-sm font-inter-semibold text-gray-800">{userName}</h3>
            <p className="text-xs font-inter-normal text-gray-500">User Account</p>
          </div>

          {/* Profile Information */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <User size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Full Name</p>
                <p className="text-xs font-inter-semibold text-gray-800">{userName}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <Mail size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Email Address</p>
                <p className="text-xs font-inter-semibold text-gray-800 truncate">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <Phone size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Phone Number</p>
                <p className="text-xs font-inter-semibold text-gray-800">+62 812-3456-7890</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <Briefcase size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Department</p>
                <p className="text-xs font-inter-semibold text-gray-800">GIS & Spatial Analysis</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <MapPin size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Location</p>
                <p className="text-xs font-inter-semibold text-gray-800">Jakarta, Indonesia</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-md">
              <Calendar size={14} className="text-blue-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-inter-medium text-gray-500">Member Since</p>
                <p className="text-xs font-inter-semibold text-gray-800">January 2024</p>
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
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
