import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    // Strict credential validation
    // if (email !== 'demo@telkom.com' || password !== 'demo123') {
    //   setTimeout(() => {
    //     setError('Invalid credentials. Please use the demo account provided below.');
    //     setIsLoading(false);
    //   }, 1000);
    //   return;
    // }

    // Simulate login with correct credentials
    setTimeout(() => {
      // Store login state in localStorage
      localStorage.setItem('telkom_gis_auth', 'true');
      localStorage.setItem('telkom_gis_user', JSON.stringify({
        email,
        loginTime: new Date().toISOString()
      }));
      
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden font-['Segoe_UI',_'Roboto',_'Helvetica_Neue',_Arial,_sans-serif]">
      
      {/* 3D Parallax Background Layers */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ transform: 'translateZ(-100px) scale(1.5)', perspective: '1000px' }}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-100/30 via-transparent to-blue-100/30 animate-parallax-slow"></div>
      </div>
      
      {/* Animated Gradient Orbs - 3D Effect */}
      <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 via-blue-200/10 to-transparent rounded-full blur-3xl animate-float-3d"></div>
      <div className="absolute bottom-20 right-32 w-80 h-80 bg-gradient-to-tl from-indigo-200/15 via-cyan-100/10 to-transparent rounded-full blur-3xl animate-float-3d animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-2xl animate-orbit-3d"></div>
      
      {/* Diagonal Lines Background with Gradient */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-cyan-400/30 via-gray-300/20 to-transparent transform -skew-x-12 animate-slide-diagonal"></div>
        <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-blue-400/30 via-gray-300/20 to-transparent transform skew-x-12 animate-slide-diagonal-reverse"></div>
      </div>

      {/* 3D Geometric Shapes with Shadows */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-cyan-300/40 rounded-2xl transform rotate-12 opacity-20 animate-float-slow shadow-2xl" style={{ transform: 'rotateX(25deg) rotateY(-25deg) rotate(12deg)' }}></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-blue-300/30 rounded-full opacity-15 animate-pulse shadow-xl" style={{ transform: 'rotateX(15deg)' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-cyan-200/40 transform rotate-45 opacity-20 animate-float-medium shadow-lg" style={{ transform: 'rotateY(25deg) rotate(45deg)' }}></div>
      
      {/* Additional 3D Cubes */}
      <div className="absolute top-1/4 right-1/3 w-16 h-16 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-cyan-300/40 to-blue-300/20 rounded-lg animate-rotate-3d shadow-lg" style={{ transform: 'rotateX(45deg) rotateY(45deg)' }}></div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 opacity-10">
        <div className="w-full h-full bg-gradient-to-tl from-blue-300/40 to-cyan-300/20 rounded-lg animate-rotate-3d-reverse shadow-lg" style={{ transform: 'rotateX(-45deg) rotateY(-45deg)' }}></div>
      </div>
      
      {/* GIS Layer Illustration - Enhanced with Gradient */}
      <div className="absolute top-1/4 left-10 space-y-2 opacity-15 animate-slide-up">
        <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full shadow-sm"></div>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400/60 via-cyan-400/40 to-transparent rounded-full shadow-sm"></div>
        <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent rounded-full shadow-sm"></div>
        <div className="w-22 h-1.5 bg-gradient-to-r from-blue-400/50 via-cyan-400/30 to-transparent rounded-full shadow-sm"></div>
      </div>
      
      {/* Enhanced Data Points Cluster with Connections */}
      <div className="absolute bottom-1/4 right-12 opacity-20">
        <svg className="absolute w-24 h-24" viewBox="0 0 100 100">
          <line x1="10" y1="10" x2="40" y2="30" stroke="url(#dotGradient)" strokeWidth="1" className="animate-draw-line" />
          <line x1="40" y1="30" x2="20" y2="60" stroke="url(#dotGradient)" strokeWidth="1" className="animate-draw-line animation-delay-1000" />
          <line x1="20" y1="60" x2="70" y2="50" stroke="url(#dotGradient)" strokeWidth="1" className="animate-draw-line animation-delay-2000" />
          <defs>
            <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative w-24 h-24">
          <div className="absolute top-1 left-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-7 left-10 w-3 h-3 bg-blue-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-blue-500/50"></div>
          <div className="absolute top-14 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse animation-delay-2000 shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-11 left-16 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
          <div className="absolute top-18 left-12 w-3 h-3 bg-cyan-400 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-cyan-400/50"></div>
        </div>
      </div>
      
      {/* Animated Map Grid Background - Enhanced */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-move"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-move-reverse"></div>
      </div>
      
      {/* Floating Map Markers - Enhanced with Glow */}
      <div className="absolute top-20 left-20 animate-float-slow">
        <MapPin className="w-8 h-8 text-cyan-400 opacity-40 drop-shadow-2xl filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
      </div>
      <div className="absolute top-40 right-32 animate-float-medium">
        <MapPin className="w-6 h-6 text-blue-400 opacity-35 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float-fast">
        <MapPin className="w-10 h-10 text-cyan-400 opacity-40 drop-shadow-2xl filter drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float-slow delay-1000">
        <MapPin className="w-7 h-7 text-blue-400 opacity-35 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]" />
      </div>
      <div className="absolute top-1/2 left-10 animate-float-medium delay-1000">
        <MapPin className="w-5 h-5 text-cyan-400 opacity-30 drop-shadow-xl filter drop-shadow-[0_0_6px_rgba(34,211,238,0.2)]" />
      </div>
      <div className="absolute top-1/3 right-10 animate-float-fast delay-2000">
        <MapPin className="w-6 h-6 text-blue-400 opacity-35 drop-shadow-2xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]" />
      </div>
      
      {/* Enhanced Background Circles with Gradient Blur */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-200/30 via-blue-200/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-tl from-blue-200/30 via-cyan-100/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-br from-cyan-100/30 via-transparent to-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      
      {/* 3D Wireframe Globe */}
      <div className="absolute top-1/3 left-1/2 opacity-10">
        <svg className="w-32 h-32 animate-rotate-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" className="animate-pulse-slow" />
          <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" className="animate-pulse-slow animation-delay-1000" />
          <ellipse cx="50" cy="50" rx="25" ry="40" fill="none" stroke="url(#globeGradient)" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="url(#globeGradient)" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="url(#globeGradient)" strokeWidth="0.5" strokeDasharray="2,2" />
          <defs>
            <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Animated Hexagon Pattern */}
      <div className="absolute bottom-1/3 right-1/4 opacity-8">
        <svg className="w-40 h-40 animate-float-slow" viewBox="0 0 100 100">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="url(#hexGradient)" strokeWidth="1" className="animate-pulse-slow" />
          <polygon points="50,25 70,37.5 70,62.5 50,75 30,62.5 30,37.5" fill="none" stroke="url(#hexGradient)" strokeWidth="0.8" className="animate-pulse-slow animation-delay-1000" />
          <polygon points="50,35 62.5,42.5 62.5,57.5 50,65 37.5,57.5 37.5,42.5" fill="none" stroke="url(#hexGradient)" strokeWidth="0.6" className="animate-pulse-slow animation-delay-2000" />
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Animated Dots Pattern with Enhanced Glow */}
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-pulse shadow-lg shadow-cyan-400/40"></div>
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-45 animate-pulse animation-delay-1000 shadow-lg shadow-blue-500/40"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-pulse animation-delay-2000 shadow-lg shadow-cyan-400/40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full opacity-45 animate-pulse shadow-lg shadow-blue-500/40"></div>
      
      {/* Spatial Lines Animation */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9ca3af', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#1FBAD6', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1FBAD6', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#1FBAD6', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#1FBAD6', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        {/* Diagonal Lines */}
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-draw-line" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient)" strokeWidth="2" className="animate-draw-line animation-delay-1000" />
        
        {/* Pulsing Circles - Location Radius */}
        <circle cx="20%" cy="30%" r="100" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse-ring" />
        <circle cx="80%" cy="70%" r="150" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse-ring animation-delay-2000" />
        
        {/* Map Route Animation - Curved Path */}
        <path 
          d="M 10,50 Q 30,20 50,40 T 90,60" 
          fill="none" 
          stroke="url(#routeGradient)" 
          strokeWidth="3" 
          className="animate-route-dash"
          strokeDasharray="10 5"
        />
        
        {/* GPS Satellite Orbit */}
        <circle cx="50%" cy="20%" r="80" fill="none" stroke="#1FBAD6" strokeWidth="1" opacity="0.2" className="animate-orbit" />
        <circle cx="50%" cy="20%" r="120" fill="none" stroke="#1FBAD6" strokeWidth="1" opacity="0.15" className="animate-orbit animation-delay-1000" />
        
        {/* Location Markers with Pulse */}
        <g className="animate-pulse-marker">
          <circle cx="15%" cy="25%" r="4" fill="#1FBAD6" opacity="0.6" />
          <circle cx="15%" cy="25%" r="8" fill="none" stroke="#1FBAD6" strokeWidth="2" opacity="0.4" />
        </g>
        
        <g className="animate-pulse-marker animation-delay-2000">
          <circle cx="85%" cy="75%" r="4" fill="#1FBAD6" opacity="0.6" />
          <circle cx="85%" cy="75%" r="8" fill="none" stroke="#1FBAD6" strokeWidth="2" opacity="0.4" />
        </g>
        
        {/* Coordinate Grid Lines */}
        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="#d1d5db" strokeWidth="1" opacity="0.15" strokeDasharray="5 5" />
        <line x1="0" y1="66%" x2="100%" y2="66%" stroke="#d1d5db" strokeWidth="1" opacity="0.15" strokeDasharray="5 5" />
        <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#d1d5db" strokeWidth="1" opacity="0.15" strokeDasharray="5 5" />
        <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#d1d5db" strokeWidth="1" opacity="0.15" strokeDasharray="5 5" />
      </svg>
      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-30px) translateX(-15px) rotate(5deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.1); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes draw-line {
          0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes route-dash {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes orbit {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.2; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.3; }
        }
        
        @keyframes pulse-marker {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        
        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }
        
        .animate-draw-line {
          animation: draw-line 3s ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-route-dash {
          animation: route-dash 3s ease-in-out infinite, draw-line 3s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 8s ease-in-out infinite;
          transform-origin: center;
        }
        
        .animate-pulse-marker {
          animation: pulse-marker 2s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
      
      {/* Login Container */}
      <div className="relative w-full max-w-md z-10">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-200/50 hover:shadow-cyan-200/50 hover:border-cyan-300/70 transition-all duration-500">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[#1FBAD6] via-cyan-500 to-cyan-600 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-grid-move"></div>
            {/* Animated circles in header */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 animate-pulse-slow animation-delay-2000"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow ring-2 ring-white/30">
                  <MapPin size={32} className="text-white drop-shadow-lg" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-center mb-2 tracking-tight">
                Telkom Akses GIS Spatial
              </h1>
              <p className="text-center text-cyan-100 text-sm font-normal tracking-wide">
                Geographic Information System Platform
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@telkom.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FBAD6] focus:border-[#1FBAD6] outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white hover:border-cyan-300 hover:bg-white"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FBAD6] focus:border-[#1FBAD6] outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white hover:border-cyan-300 hover:bg-white"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <span className="text-red-500 font-bold">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1FBAD6] border-gray-300 rounded focus:ring-[#1FBAD6]"
                  />
                  <span className="ml-2 text-sm text-gray-600 font-normal">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#1FBAD6] hover:text-cyan-600 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#1FBAD6] via-cyan-500 to-cyan-600 hover:from-cyan-600 hover:via-cyan-600 hover:to-cyan-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              
            </div>

            {/* Demo Login Info */}
            
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-xs text-gray-500">
              © 2025 Telkom Indonesia. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Grid Pattern Styles */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(229, 231, 235, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 231, 235, 0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes float-3d {
          0%, 100% {
            transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-20px) translateZ(10px) rotateX(5deg) rotateY(5deg);
          }
          50% {
            transform: translateY(-10px) translateZ(20px) rotateX(10deg) rotateY(-5deg);
          }
          75% {
            transform: translateY(-15px) translateZ(10px) rotateX(-5deg) rotateY(5deg);
          }
        }
        
        @keyframes orbit-3d {
          0% {
            transform: rotate(0deg) translateX(30px) rotateX(15deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotateX(15deg);
          }
        }
        
        @keyframes rotate-3d {
          0% {
            transform: rotateX(45deg) rotateY(45deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(45deg) rotateY(45deg) rotateZ(360deg);
          }
        }
        
        @keyframes rotate-3d-reverse {
          0% {
            transform: rotateX(-45deg) rotateY(-45deg) rotateZ(360deg);
          }
          100% {
            transform: rotateX(-45deg) rotateY(-45deg) rotateZ(0deg);
          }
        }
        
        @keyframes slide-diagonal {
          0%, 100% {
            transform: translateX(0) skewX(-12deg);
          }
          50% {
            transform: translateX(20px) skewX(-12deg);
          }
        }
        
        @keyframes slide-diagonal-reverse {
          0%, 100% {
            transform: translateX(0) skewX(12deg);
          }
          50% {
            transform: translateX(-20px) skewX(12deg);
          }
        }
        
        @keyframes slide-up {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.25;
          }
        }
        
        @keyframes parallax-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes grid-move-reverse {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -40px -40px;
          }
        }
        
        @keyframes rotate-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-float-3d {
          animation: float-3d 8s ease-in-out infinite;
        }
        
        .animate-orbit-3d {
          animation: orbit-3d 15s linear infinite;
        }
        
        .animate-rotate-3d {
          animation: rotate-3d 20s linear infinite;
        }
        
        .animate-rotate-3d-reverse {
          animation: rotate-3d-reverse 18s linear infinite;
        }
        
        .animate-slide-diagonal {
          animation: slide-diagonal 12s ease-in-out infinite;
        }
        
        .animate-slide-diagonal-reverse {
          animation: slide-diagonal-reverse 12s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 8s ease-in-out infinite;
        }
        
        .animate-parallax-slow {
          animation: parallax-slow 20s ease-in-out infinite;
        }
        
        .animate-grid-move-reverse {
          animation: grid-move-reverse 30s linear infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;