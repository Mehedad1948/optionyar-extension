import React, { useEffect, useState, useCallback } from 'react';
import {
  Loader2, TrendingUp, TrendingDown, Clock, RefreshCw,
  Calendar, ListFilter, Layers, Moon, Sun, Filter
} from 'lucide-react';
import SignalCard from './signalCard';
import { TalebSignal } from '../../../types';
import { useExtensionStream } from '../../../hooks/use-signal-stream';
import { fetchWithAuth } from '../../../lib/api';

// --- Types ---


type FilterType = 'ALL' | 'CALL' | 'PUT';
type FilterDate = 'ALL' | 'TODAY';

export const SignalList = () => {
  const [signals, setSignals] = useState<TalebSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [isDark, setIsDark] = useState(false); // Default: Light Mode
  const [typeFilter, setTypeFilter] = useState<FilterType>('ALL');
  const [dateFilter, setDateFilter] = useState<FilterDate>('ALL');

  // --- 1. Fetch Logic ---
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWithAuth('/api/signals/latest');

      

      if (Array.isArray(data?.data)) {
        setSignals(data.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err: any) {
      console.error("Failed to fetch signals:", err);
      setError("خطا در دریافت اطلاعات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // --- 2. Live Stream ---
  const handleLiveSignal = useCallback((newSignal: TalebSignal) => {
    setSignals((prev) => {
      // Prevent duplicates based on ID
      if (prev.some(s => s.id === newSignal.id)) return prev;
      return [newSignal, ...prev];
    });
  }, []);

  useExtensionStream(handleLiveSignal);

  // --- 3. Filtering Logic ---
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const filteredSignals = signals.filter(signal => {
    // 1. Date Filter
    if (dateFilter === 'TODAY' && !isToday(signal.createdAt)) return false;

    // 2. Type Filter
    // Since rows are single, we keep the row if it contains the relevant advice
    if (typeFilter === 'CALL' && !signal.callAdvice) return false;
    if (typeFilter === 'PUT' && !signal.putAdvice) return false;

    return true;
  });

  // --- Helper for Date Formatting ---
  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });

  // --- Render ---
  // We wrap everything in a div that toggles the 'dark' class
  return (
    <div className={`pb-16 h-full`}>
      <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 transition-colors duration-300" dir="rtl">

        {/* === Header & Filters === */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 shadow-sm">

          {/* Top Row: Title & Theme Toggle */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <Filter size={16} className="text-amber-500" />
              سیگنال‌های بازار آپشن
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setTypeFilter('ALL')}
              className={`flex-1 text-[11px] py-1.5 rounded-md border font-medium transition-all
                ${typeFilter === 'ALL'
                  ? 'bg-slate-800 dark:bg-slate-700 border-slate-800 text-white'
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400'}`}
            >
              همه
            </button>
            <button
              onClick={() => setTypeFilter('CALL')}
              className={`flex-1 text-[11px] py-1.5 rounded-md border font-medium transition-all
                ${typeFilter === 'CALL'
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-400'
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400'}`}
            >
              خرید (Call)
            </button>
            <button
              onClick={() => setTypeFilter('PUT')}
              className={`flex-1 text-[11px] py-1.5 rounded-md border font-medium transition-all
                ${typeFilter === 'PUT'
                  ? 'bg-rose-100 dark:bg-rose-500/20 border-rose-300 dark:border-rose-500/50 text-rose-700 dark:text-rose-400'
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400'}`}
            >
              فروش (Put)
            </button>
          </div>

          {/* Date Filter & Count */}
          <div className="flex justify-between items-center px-1">
            <button
              onClick={() => setDateFilter(prev => prev === 'ALL' ? 'TODAY' : 'ALL')}
              className={`flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full border transition-colors
                  ${dateFilter === 'TODAY'
                  ? 'bg-amber-100 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/50 text-amber-700 dark:text-amber-400'
                  : 'bg-gray-100 dark:bg-slate-800 border-transparent text-gray-500 dark:text-slate-400'}`}
            >
              <Calendar size={10} />
              {dateFilter === 'TODAY' ? 'فقط امروز' : 'تمام تاریخچه'}
            </button>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
              {filteredSignals.length} Signal
            </span>
          </div>
        </div>

        {/* === Content Area === */}
        <div className="flex-1 overflow-y-auto p-1 space-y-4">

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-rose-500 text-xs mb-2">{error}</p>
              <button onClick={fetchHistory} className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-slate-800 px-3 py-1 rounded">
                <RefreshCw size={12} /> تلاش مجدد
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-amber-500" size={24} />
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredSignals.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-slate-600 gap-2">
              <ListFilter size={32} strokeWidth={1.5} />
              <span className="text-xs">سیگنالی یافت نشد</span>
            </div>
          )}

          {/* Signal Cards */}
          {filteredSignals.map((signal) => {
            // Logic to show specific sub-rows based on filter
            const showCall = (typeFilter === 'ALL' || typeFilter === 'CALL') && !!signal.callAdvice;
            const showPut = (typeFilter === 'ALL' || typeFilter === 'PUT') && !!signal.putAdvice;

            return (
              <SignalCard showCalls={showCall} showPuts={showPut} signal={signal} key={signal.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
