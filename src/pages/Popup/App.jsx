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
import HeroImage from '../../assets/img/hero-2.png'; // Imported the swan image

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
        <Logo className="w-36 h-36 text-amber-950 animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      // Added 'relative' and 'overflow-hidden' for the bottom-right image positioning
      <div className="w-[360px] h-[550px] flex flex-col items-center justify-center bg-white p-2 text-center space-y-6 font-sans relative overflow-hidden">
        <div className='flex flex-col gap-2'>
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center ">
            <Logo className="text-black w-10" />
          </div>
          <span className="text-xl  font-black tracking-tight text-gray-900 dark:text-white">
            آپشن‌<span className="text-amber-600">یار</span>
          </span>
        </div>
        <div dir='rtl' className="z-10 relative">
          <h2 className="text-xl font-bold text-gray-900 mb-2">نیاز به ورود</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            برای مشاهده سیگنال‌ها وارد حساب شوید.
          </p>
        </div>

        {/* Updated Button: Amber color + Logo added */}
        <a
          href={`${APP_URL}/login`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-4/5 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-xl transition-colors z-10 relative shadow-md"
        >
          {/* Added Logo to button */}
          <span>ورود به وب‌سایت</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          onClick={loadData}
          className="text-xs text-gray-400 hover:text-amber-600 flex items-center gap-1 z-10"
        >
          <RefreshCcw className="w-3 h-3" />
          <span>بررسی مجدد</span>
        </button>

        {/* Privacy Policy Link (Best place for validator) */}
        <a
          href={`${APP_URL}/policy`}
          target="_blank"
          className="text-[10px] text-gray-300 hover:text-gray-500 absolute bottom-2 left-3 z-20"
        >
          قوانین و حریم خصوصی
        </a>

        {/* Swan Image: Bottom Right */}
        <img
          src={HeroImage}
          alt="Swan"
          className="absolute -bottom-5 -right-5 w-40 opacity-90 pointer-events-none"
        />
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
          <Logo className={'text-black dark:text-white w-6 '} />
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
