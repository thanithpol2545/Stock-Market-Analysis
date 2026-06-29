/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  Calculator, 
  Search, 
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StockAnalysis, ValuationScenario } from './types';
import { performDCF, formatCurrency, formatPercent } from './lib/valuationUtils';
import { DUMMY_ANALYSIS } from './lib/dummyData';
import FinancialTable from './components/FinancialTable';
import ValuationSummary from './components/ValuationSummary';
import SensitivityMatrix from './components/SensitivityMatrix';
import RiskRadar from './components/RiskRadar';
import { getStockData } from './services/geminiService';

export default function App() {
  const [activeAnalysis, setActiveAnalysis] = useState<StockAnalysis>(DUMMY_ANALYSIS);
  const [activeTab, setActiveTab] = useState<'summary' | 'financials' | 'valuation' | 'risk'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getStockData(searchQuery);
      if (data) {
        setActiveAnalysis(data);
        setActiveTab('summary');
      } else {
        setError("Could not retrieve data for that stock. Please try a different ticker.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An unexpected error occurred during the analysis pipeline.");
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  const handleUpdateInput = (key: keyof typeof activeAnalysis.inputs, value: number) => {
    setActiveAnalysis(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [key]: value
      }
    }));
  };

  const sortedHistory = useMemo(() => {
    return [...activeAnalysis.history].sort((a, b) => a.year - b.year);
  }, [activeAnalysis.history]);

  const latestYearData = useMemo(() => {
    return sortedHistory[sortedHistory.length - 1];
  }, [sortedHistory]);

  const valuation = useMemo(() => {
    if (!latestYearData) return null;
    return performDCF(latestYearData, activeAnalysis.inputs);
  }, [latestYearData, activeAnalysis.inputs]);

  const upside = useMemo(() => {
    if (!valuation) return 0;
    return ((valuation.intrinsicValuePerShare - activeAnalysis.currentPrice) / activeAnalysis.currentPrice) * 100;
  }, [valuation, activeAnalysis.currentPrice]);
  
  const statusColor = upside > 20 ? 'text-emerald-600' : upside < -10 ? 'text-rose-600' : 'text-amber-600';
  const statusBg = upside > 20 ? 'bg-emerald-50' : upside < -10 ? 'bg-rose-50' : 'bg-amber-50';

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <span className="font-bold tracking-tight text-lg uppercase hidden md:block">EquiValue v1.0</span>
        </div>
        
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
                placeholder="Search Ticker (e.g. AAPL, BTC, NVIDIA)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-none py-2 pl-10 pr-4 text-xs font-mono focus:border-indigo-500 focus:ring-0 outline-none transition-all disabled:opacity-50"
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 animate-spin" />
              )}
            </form>
            {error && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] px-4 py-1 font-bold uppercase z-[60]">
                {error}
              </div>
            )}
          </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-1">
            <div className={`w-2 h-2 ${loading ? 'bg-indigo-300' : 'bg-indigo-600'}`}></div>
            <div className={`w-2 h-2 ${loading ? 'bg-indigo-300' : 'bg-indigo-600'}`}></div>
            <div className="w-2 h-2 bg-slate-200"></div>
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-400 max-sm:hidden">
            {loading ? 'Analyzing Data...' : 'Analysis Ready'}
          </span>
          <div className="w-8 h-8 rounded-none bg-slate-100 border border-slate-200 flex items-center justify-center">
            <span className="text-[10px] font-bold">SYS</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-40 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                 <p className="font-mono text-xs uppercase tracking-widest text-slate-500 animate-pulse">Running Gemini Scraper Pipeline...</p>
                 <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Sidebar: Process Architecture */}
        <aside className="w-72 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Methodology Stages</h2>
          </div>
          <div className="flex-1 py-4">
            {[
              { id: 'summary', label: 'Summary Synthesis', num: '01', icon: BarChart3 },
              { id: 'financials', label: 'Structural Data', num: '02', icon: Layers },
              { id: 'valuation', label: 'Valuation Lab', num: '03', icon: Calculator },
              { id: 'risk', label: 'Protocol Validation', num: '04', icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-6 py-4 border-l-4 flex items-center gap-4 transition-all text-left ${
                  activeTab === tab.id 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-[10px] opacity-60">{tab.num}</span>
                <span className={`text-sm font-semibold ${activeTab === tab.id ? 'text-indigo-700' : ''}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold uppercase text-slate-500">{activeAnalysis.ticker} Coverage</span>
              <span className="text-[10px] font-mono">84%</span>
            </div>
            <div className="w-full h-1 bg-slate-200">
              <div className="w-[84%] h-full bg-indigo-600"></div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-light text-slate-800">{activeAnalysis.companyName}</h1>
                <span className="font-mono px-1 bg-slate-200 text-slate-600 text-[10px] font-bold uppercase">
                  {activeAnalysis.ticker}
                </span>
              </div>
              <p className="text-slate-500 text-sm">{activeTab.toUpperCase()} PHASE — SYSTEMIC ANALYSIS ACTIVE.</p>
            </div>
            <div className="flex gap-4">
               <div className="text-right">
                  <div className="text-2xl font-light">{formatCurrency(activeAnalysis.currentPrice)}</div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Market Price — {new Date(activeAnalysis.lastUpdated).toLocaleString()}
                  </div>
                  <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-tighter">
                    Source: Google Search Grounding (Live)
                  </div>
               </div>
               <button className="h-10 px-6 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors">
                Execute Export
               </button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-12 gap-6"
          >
            {activeTab === 'summary' && (
              <>
                <div className="col-span-8 grid grid-cols-2 gap-6">
                  <ValuationSummary valuation={valuation} analysis={activeAnalysis} />
                  
                  <div className="col-span-2 bg-white border border-slate-200">
                     <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">The Valuation Bridge (Price vs Value)</h3>
                        <div className="flex items-center gap-1">
                           <div className="w-1 h-1 bg-slate-300"></div>
                           <div className="w-1 h-1 bg-slate-200"></div>
                        </div>
                     </div>
                     <div className="p-8 grid grid-cols-2 gap-12">
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Market Quote</p>
                           <div className="flex items-baseline gap-2">
                             <span className="text-4xl font-mono font-bold text-slate-400">
                               {formatCurrency(activeAnalysis.currentPrice)}
                             </span>
                           </div>
                           <p className="text-[10px] mt-2 text-slate-400 font-mono italic">
                             Reflects transient market sentiment & liquidity.
                           </p>
                        </div>
                        <div className={`p-4 border border-indigo-100 ${upside > 0 ? 'bg-indigo-50' : 'bg-rose-50'}`}>
                           <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Intrinsic Buy Target</p>
                           <div className="flex items-baseline gap-2">
                             <span className={`text-4xl font-mono font-bold ${upside > 0 ? 'text-indigo-700' : 'text-rose-700'}`}>
                               {valuation ? formatCurrency(valuation.intrinsicValuePerShare) : 'N/A'}
                             </span>
                           </div>
                           <p className="text-[10px] mt-2 text-indigo-600 font-mono font-bold">
                             {upside > 0 ? 'SIGNAL: UNDERVALUED' : 'SIGNAL: PREMIUM'}
                           </p>
                        </div>
                     </div>
                     <div className="p-6 bg-slate-50 border-t border-slate-100 italic text-[11px] leading-relaxed text-slate-500">
                        <Info className="w-3 h-3 inline mr-1 mb-0.5 text-indigo-500" />
                        <strong>Market Price vs Intrinsic Value:</strong>
                        <p className="mt-1">
                          The <strong>Market Price</strong> ({formatCurrency(activeAnalysis.currentPrice)}) is what you pay today based on supply, demand, and short-term news. 
                          The <strong>Intrinsic Value</strong> ({valuation ? formatCurrency(valuation.intrinsicValuePerShare) : 'N/A'}) is what the company is "worth" based on its actual cash flows from financial statements.
                        </p>
                        <p className="mt-1">
                          You should buy when "Market Price" is significantly lower than "Intrinsic Value" (a {upside > 0 ? 'Margin of Safety' : 'Premium'} of {Math.abs(upside).toFixed(1)}%).
                        </p>
                     </div>
                  </div>
                </div>

                <div className="col-span-4 bg-slate-900 p-8 text-white flex flex-col">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8">Metrics Output</h3>
                  <div className="flex-1 flex flex-col gap-10">
                    <div>
                      <div className="text-4xl font-light mb-1 font-mono tracking-tighter">{formatPercent(valuation.wacc)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">WACC Baseline</div>
                    </div>
                    <div className="h-[1px] bg-slate-800"></div>
                    <div>
                      <div className="text-4xl font-light mb-1 font-mono tracking-tighter">{formatCurrency(valuation.enterpriseValue)}</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">System EV</div>
                    </div>
                    <div className="h-[1px] bg-slate-800"></div>
                    <RiskRadar scores={activeAnalysis.riskScore} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'financials' && (
              <div className="col-span-12 bg-white border border-slate-200 p-8">
                <FinancialTable history={activeAnalysis.history} />
              </div>
            )}

            {activeTab === 'valuation' && (
              <div className="col-span-12 grid grid-cols-12 gap-6">
                <div className="col-span-9 bg-white border border-slate-200 p-8">
                   <SensitivityMatrix valuation={valuation} inputs={activeAnalysis.inputs} latestYear={latestYearData} />
                </div>
                <div className="col-span-3 bg-slate-100 p-6 flex flex-col gap-6">
                   <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Constraint Library (Editable)</h4>
                   <div className="space-y-4">
                      {(Object.entries(activeAnalysis.inputs) as [keyof typeof activeAnalysis.inputs, number][]).map(([key, val]) => (
                        <div key={key} className="flex flex-col gap-1 border-b border-slate-200 pb-3">
                           <label className="text-[10px] font-medium text-slate-500 uppercase">{key.replace(/([A-Z])/g, ' $1')}</label>
                           <input 
                              type="number" 
                              step="0.001"
                              value={val}
                              onChange={(e) => handleUpdateInput(key, parseFloat(e.target.value))}
                              className="text-sm font-mono text-slate-900 font-bold bg-white border border-slate-300 px-2 py-1 focus:ring-1 focus:ring-indigo-500 outline-none"
                           />
                        </div>
                      ))}
                   </div>
                   <div className="mt-8 bg-indigo-600 p-4 text-white text-[10px] font-bold uppercase tracking-widest text-center cursor-default">
                      Real-time Recalculation Active
                   </div>
                   <div className="mt-auto bg-white p-4 border border-slate-200 text-[10px] italic leading-relaxed text-slate-500">
                     "Modifying core constraints ripples across the entire valuation architecture. Ensure structural integrity of assumptions."
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="col-span-12 bg-white border border-slate-200 p-8">
                <RiskRadar scores={activeAnalysis.riskScore} detailed />
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-slate-100 border-t border-slate-200 px-8 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0">
        <div className="flex gap-4">
          <span>STRATEGY: FUNDAMENTAL INTRINSIC</span>
          <span>UPTIME: {new Date().toLocaleTimeString()}</span>
          <span>CORE: GEMINI-3-FLASH</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>LIVE ANALYSIS STREAM ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}

