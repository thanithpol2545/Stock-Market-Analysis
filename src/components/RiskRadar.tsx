/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { RiskScore } from '../types';

interface Props {
  scores: RiskScore;
  detailed?: boolean;
}

export default function RiskRadar({ scores, detailed }: Props) {
  const data = [
    { subject: 'Business', A: scores.business * 20, fullMark: 100 },
    { subject: 'Financial', A: scores.financial * 20, fullMark: 100 },
    { subject: 'Management', A: scores.management * 20, fullMark: 100 },
    { subject: 'Governance', A: scores.governance * 20, fullMark: 100 },
    { subject: 'Macro', A: scores.macro * 20, fullMark: 100 },
    { subject: 'Regulatory', A: scores.regulatory * 20, fullMark: 100 },
  ];

  const getColor = (value: number) => {
    if (value >= 80) return '#10b981'; // Emerald (Low Risk / High Score)
    if (value >= 60) return '#34d399';
    if (value >= 40) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose (High Risk)
  };

  if (detailed) {
    return (
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-bold mb-6">Risk Dimension Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  />
                  <Radar
                    name="Risk Profile"
                    dataKey="A"
                    stroke="#0f172a"
                    strokeWidth={2}
                    fill="#0f172a"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {data.map(item => (
                <div key={item.subject}>
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{item.subject} Risk</span>
                      <span className="text-xs font-mono font-bold text-slate-900">{item.A / 20}/5</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500" 
                        style={{ 
                          width: `${item.A}%`,
                          backgroundColor: getColor(item.A)
                        }} 
                      />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
           <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Conclusion</h4>
           <p className="text-slate-600 text-sm leading-relaxed">
             The qualitative assessment indicates a moderate overall risk profile. Financial instability is low 
             due to strong balance sheet liquidity, while industry and regulatory risks represent the primary 
             valuation drag. A margin of safety of at least 20% is recommended given the sensitivity to 
             regulatory shifts.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} />
            <Radar
              name="Risk"
              dataKey="A"
              stroke="#0f172a"
              fill="#0f172a"
              fillOpacity={0.1}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2">
        <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Risk Summary</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs text-slate-600">Financial stability is strong (Interest Coverage {'>'} 15x)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-xs text-slate-600">Regulatory environment is evolving (Antitrust risk)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs text-slate-600">Governance scores top quartile relative to peers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
