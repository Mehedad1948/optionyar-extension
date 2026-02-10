import { Bot, Calendar, Check, ChevronDown, ChevronUp, Copy, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Advice, TalebSignal } from '../../../types';
import { formatDateTime, formatPrice } from '../../../lib/helpers';


// --- Sub-Component: Option Block (Call or Put) ---
const OptionBlock = ({ advice, type }: { advice: Advice, type: 'CALL' | 'PUT', }) => {
    const [copied, setCopied] = useState(false);
    const isCall = type === 'CALL';

    // Styles based on type
    const themeColor = isCall ? 'text-emerald-700' : 'text-violet-700';
    const bgColor = isCall ? 'bg-emerald-50' : 'bg-violet-50';
    const borderColor = isCall ? 'border-emerald-200' : 'border-violet-200';
    const iconColor = isCall ? 'text-emerald-500' : 'text-violet-500';

    const handleCopySymbol = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(advice.symbol);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={` border  rounded-xl overflow-hidden  mb-2 relative`}>
            {/* Header: Type and Price */}
            <div className={`${bgColor} ${borderColor} flex p-2 justify-between items-center mb-2 pb-2 border-b`}>
                <div className="flex items-center gap-1.5">
                    {isCall ? <TrendingUp className={`w-4 h-4 ${iconColor}`} /> : <TrendingDown className={`w-4 h-4 ${iconColor}`} />}
                    <span className={`font-bold text-base ${themeColor}`}>
                        {isCall ? 'خرید Call' : 'خرید Put'}
                    </span>
                </div>

                {/* Price */}

            </div>

            {/* Body: Symbol and Specific Reasoning */}
            <div className='p-2'>


                <div className="flex justify-between items-center">
                    {/* Symbol Copy Button */}
                    <button
                        onClick={handleCopySymbol}
                        className={`flex cursor-pointer items-center gap-2 group p-1 -mr-1 rounded-md transition-colors hover:${bgColor}`}
                        title="کپی نماد"
                    >
                        <span className="text-lg font-black text-gray-800 tracking-wide font-mono">
                            {advice.symbol}
                        </span>
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                        )}
                    </button>

                    <div className="flex items-center text-green-700 gap-1">
                        <span className="text-[10px] ">ورود:</span>
                        <span className="text-base font-bold  ">
                            {formatPrice(advice.entry_price)}
                        </span>
                        <span className="text-[9px] ">ریال</span>
                    </div>

                    {/* Specific Advice Text */}

                </div>
                <p className="text-sm text-right text-gray-700  pl-1 leading-4 " dir="rtl">
                    {advice.reasoning}
                </p>
            </div>
        </div>
    );
};

const SignalCard = ({ signal, showCalls, showPuts }: { signal: TalebSignal, showCalls: boolean, showPuts: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasCall = signal.callAdvice?.decision === 'BUY';
    const hasPut = signal.putAdvice?.decision === 'BUY';

    // If absolutely no advice, don't render (safety check)
    if (!hasCall && !hasPut) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm mb-4 overflow-hidden">

            {/* Card Header: Date/Time */}
            <div className=" px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs font-semibold">{formatDateTime(signal.createdAt)}</span>
                </div>
            </div>

            <div className="p-2">
                {/* Render Call Option if exists */}
                {hasCall && signal.callAdvice && showCalls && (
                    <OptionBlock advice={signal.callAdvice} type="CALL" />
                )}

                {/* Render Put Option if exists */}
                {hasPut && signal.putAdvice && showPuts && (
                    <OptionBlock advice={signal.putAdvice} type="PUT" />
                )}

                {/* Common AI Analysis (Accordion) */}
                <div className="mt-3 pt-2 border-t border-gray-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between w-full p-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-indigo-500" />
                            <span>تحلیل کلی بازار و سیگنال</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isOpen && (
                        <div className="mt-2 p-2.5 rounded-lg text-[11px] leading-5 text-gray-600 bg-gray-50 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200 text-justify">
                            {signal.aiReasoning}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignalCard