import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface LoginSuccessAlertProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const LoginSuccessAlert: React.FC<LoginSuccessAlertProps> = ({ isOpen, onClose, userName }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-[10002] animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl border border-green-200 overflow-hidden min-w-[320px] max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-white" />
            <h3 className="text-xs font-inter-semibold text-white">Login Successful</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-md p-0.5 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={16} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-inter-semibold text-gray-800">
              Welcome back, {userName}!
            </p>
            <p className="text-[10px] font-inter-normal text-gray-600 mt-0.5">
              You have successfully logged in to Telkom GIS Spatial Platform.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessAlert;
