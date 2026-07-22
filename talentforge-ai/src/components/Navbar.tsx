'use client';

import React, { useState } from 'react';
import { UserRole } from '../app/types';
import { Sparkles, Briefcase, User, Zap, Bell, Check, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  aiCredits: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange, aiCredits }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your resume ATS score improved to 84%!", time: "5m ago", read: false },
    { id: 2, text: "Recruiter viewed your profile for Senior Full Stack AI Engineer", time: "1h ago", read: false },
    { id: 3, text: "AI Mock Interview feedback scorecard is ready", time: "2h ago", read: true }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-white">Talent<span className="gradient-text">Forge</span></span>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full border border-indigo-500/30 font-medium">AI v2.4</span>
            </div>
            <p className="text-xs text-gray-400 hidden sm:block">AI-Powered Career & Recruitment Engine</p>
          </div>
        </div>

        {/* Dual Mode Switcher */}
        <div className="bg-slate-900/80 p-1 rounded-xl border border-white/10 flex items-center space-x-1">
          <button
            onClick={() => onRoleChange('candidate')}
            className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentRole === 'candidate'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Job Seeker Portal</span>
          </button>
          
          <button
            onClick={() => onRoleChange('recruiter')}
            className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentRole === 'recruiter'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Recruiter Suite</span>
          </button>
        </div>

        {/* Right Utility Bar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* AI Credits Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{aiCredits.toLocaleString()} AI Credits</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-2xl border border-white/15 p-4 z-50 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="font-semibold text-sm text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-lg text-xs border ${
                        notif.read ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-indigo-950/30 border-indigo-500/30 text-gray-200'
                      }`}
                    >
                      <p>{notif.text}</p>
                      <span className="text-[10px] text-gray-500 mt-1 block">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500/30">
              AR
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">Alex Rivera</p>
              <div className="flex items-center space-x-1 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Pro</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
