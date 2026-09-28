'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Power,
  ShieldCheck,
  Activity,
  Layers,
  Fuel,
  RefreshCw,
  Gauge
} from 'lucide-react';
import { useDcim } from '@/context/DcimContext';

export default function PowerRedundancyPage() {
  const { power } = useDcim();

  return (
    <div className="min-h-screen bg-[#030712] text-[#e2e8f0] pb-24 font-mono">
      {/* Header */}
      <section className="bg-[#070b16] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>TIER IV 2N POWER REDUNDANCY & FLYWHEEL UPS SUBSTATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">
              2N ELECTRICAL <span className="text-sky-400">DISTRIBUTION</span>
            </h1>
          </div>

          <div className="text-xs text-zinc-400 bg-[#080d1a] border border-zinc-800 p-2.5">
            UTILITY STATUS: <strong className="text-emerald-400 font-bold">{power.utilityFeedStatus}</strong>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dual Feed A / Feed B UPS Telemetry (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="dcim-rack-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase">2N INDEPENDENT UNINTERRUPTIBLE POWER SUPPLY (UPS)</span>
                <span className="text-[10px] text-emerald-400 font-bold">ZERO TRANSFER TIME (STS)</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Feed A */}
                <div className="bg-[#050811] border border-zinc-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">FEED 'A' (PRIMARY BUS)</span>
                    <span className="text-xs text-emerald-400 font-bold">NORMAL</span>
                  </div>
                  <div className="text-3xl font-black text-white">{power.upsFeedA_LoadPct}% <span className="text-xs text-zinc-500 font-normal">LOAD</span></div>
                  <div className="w-full bg-zinc-800 h-2">
                    <div className="bg-sky-400 h-full" style={{ width: `${power.upsFeedA_LoadPct}%` }} />
                  </div>
                  <div className="text-[10px] text-zinc-500 pt-1">
                    ACTIVE POWER: 883 kW • VOLTAGE: 400V 3-PHASE • 50.0 Hz
                  </div>
                </div>

                {/* Feed B */}
                <div className="bg-[#050811] border border-zinc-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400">FEED 'B' (REDUNDANT BUS)</span>
                    <span className="text-xs text-emerald-400 font-bold">NORMAL</span>
                  </div>
                  <div className="text-3xl font-black text-white">{power.upsFeedB_LoadPct}% <span className="text-xs text-zinc-500 font-normal">LOAD</span></div>
                  <div className="w-full bg-zinc-800 h-2">
                    <div className="bg-purple-400 h-full" style={{ width: `${power.upsFeedB_LoadPct}%` }} />
                  </div>
                  <div className="text-[10px] text-zinc-500 pt-1">
                    ACTIVE POWER: 957 kW • VOLTAGE: 400V 3-PHASE • 50.0 Hz
                  </div>
                </div>
              </div>

              {/* Substation Transformers */}
              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-400">
                <div className="text-white font-bold uppercase text-[10px]">FACILITY 22kV SUBSTATION TRANSFORMERS:</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">TX-01 (HALL 1)</div>
                    <div className="font-bold text-white mt-1">2,500 kVA (48%)</div>
                  </div>
                  <div className="p-2.5 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">TX-02 (HALL 2)</div>
                    <div className="font-bold text-white mt-1">2,500 kVA (52%)</div>
                  </div>
                  <div className="p-2.5 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">STS SYNC ANGLE</div>
                    <div className="font-bold text-emerald-400 mt-1">0.12° (IN-PHASE)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backup Diesel Genset & Fuel Autonomy (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="dcim-rack-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase">STANDBY DIESEL GENERATOR FLEET</span>
                <span className="text-[10px] text-yellow-400 font-bold">STANDBY ARMED</span>
              </div>

              <div className="p-4 bg-[#050811] border border-zinc-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">FUEL AUTONOMY RESERVES:</span>
                  </div>
                  <strong className="text-amber-400 text-lg font-black">{power.dieselGenReservesHours} HOURS</strong>
                </div>

                <div className="w-full bg-zinc-800 h-2">
                  <div className="bg-amber-400 h-full w-[95%]" />
                </div>
                <div className="text-[10px] text-zinc-500">
                  48,000 LITERS ULTRA-LOW SULFUR DIESEL (FULL RATING TIER IV)
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-400">
                <div className="p-2.5 bg-[#050811] border border-zinc-800 flex justify-between">
                  <span>GENSET 01 (CUMMINS QSK60):</span>
                  <strong className="text-emerald-400">STANDBY (0 RPM)</strong>
                </div>
                <div className="p-2.5 bg-[#050811] border border-zinc-800 flex justify-between">
                  <span>GENSET 02 (CUMMINS QSK60):</span>
                  <strong className="text-emerald-400">STANDBY (0 RPM)</strong>
                </div>
                <div className="p-2.5 bg-[#050811] border border-zinc-800 flex justify-between">
                  <span>GENSET 03 (N+1 REDUNDANT):</span>
                  <strong className="text-emerald-400">STANDBY (0 RPM)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
