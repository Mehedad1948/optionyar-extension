/* --- START FILE: App.jsx --- */
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Lock,
  RefreshCcw,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { APP_URL, fetchWithAuth } from '../../lib/api';
import { getDaysLeft } from '../../lib/helpers';
import { SignalList } from './components/SignalList';

import Logo from './components/Logo';

// --- Main App Component ---
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const userData = await fetchWithAuth('/api/auth/me');
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED' || error.message.includes('401')) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-[360px] h-[550px] flex items-center justify-center bg-gray-50 font-sans">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-[360px] h-[550px] flex flex-col items-center justify-center bg-white p-2 text-center space-y-6 font-sans">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
          <Lock className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">نیاز به ورود</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            برای مشاهده سیگنال‌ها وارد حساب شوید.
          </p>
        </div>
        <a
          href={`${APP_URL}/login`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <span>ورود به وب‌سایت</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        <button
          onClick={loadData}
          className="text-xs text-gray-400 hover:text-indigo-600 flex items-center gap-1"
        >
          <RefreshCcw className="w-3 h-3" />
          <span>بررسی مجدد</span>
        </button>
      </div>
    );
  }

  const daysLeft = getDaysLeft(user?.subscriptionExpiresAt);

  return (
    <div
      className="w-[360px] bg-gray-50 min-h-[600px] flex flex-col relative font-sans"
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white px-5 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Logo />
          <h1 className="font-bold text-lg text-gray-800 tracking-tight font-sans">
            آپشن یار
          </h1>
        </div>

        <div
          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
            daysLeft > 3
              ? 'bg-indigo-50 text-indigo-600'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {daysLeft > 0
            ? `${new Intl.NumberFormat('fa-IR').format(
                daysLeft
              )} روز باقی‌مانده`
            : 'فاقد اعتبار'}
        </div>
      </header>

      {/* Content List */}
      <SignalList />

      {/* Fixed Dashboard Link - Always Visible at Bottom */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
        <a
          href={`${APP_URL}/dashboard`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs font-bold py-2.5 rounded-lg transition-all"
        >
          <span>مشاهده داشبورد کامل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default AppContent;
/* --- END FILE: App.jsx --- */
