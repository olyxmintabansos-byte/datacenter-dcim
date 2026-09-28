'use client';

import React from 'react';
import Link from 'next/link';
import {
  Thermometer,
  Wind,
  Droplets,
  Activity,
  Layers,
  Cpu,
  RefreshCw,
  Zap,
  Radio
} from 'lucide-react';
import { useDcim } from '@/context/DcimContext';

export default function ThermalCoolingPage() {
  const { cooling, racks } = useDcim();

  return (
    <div className="min-h-screen bg-[#030712] text-[#e2e8f0] pb-24 font-mono">
      {/* Header */}
      <section className="bg-[#070b16] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-bold">
              <Thermometer className="w-4 h-4 text-sky-400" />
              <span>CFD THERMAL DYNAMICS & DIRECT-TO-CHIP LIQUID COOLING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">
              CONTAINMENT <span className="text-sky-400">CFD TELEMETRY</span>
            </h1>
          </div>

          <div className="text-xs text-zinc-400 bg-[#080d1a] border border-zinc-800 p-2.5">
            COOLING PLANT COP: <strong className="text-emerald-400 font-bold">6.4 (ASHRAE TIER IV)</strong>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cold Aisle / Hot Aisle Telemetry (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="dcim-rack-panel p-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
                <span className="text-xs font-bold text-white uppercase">AISLE CONTAINMENT DELTA-T THERMODYNAMICS</span>
                <span className="text-[10px] text-sky-400">DELTA-T: +15.7°C RISE</span>
              </div>

              {/* Thermal Gradient Comparison */}
              <div className="grid grid-cols-2 gap-4">
                {/* Cold Aisle (Inlet) */}
                <div className="bg-[#050e1e] border-2 border-sky-500/50 p-5 rounded space-y-2">
                  <div className="text-[10px] text-sky-400 font-bold flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" />
                    <span>COLD AISLE (INLET SUPPLY)</span>
                  </div>
                  <div className="text-3xl font-black text-sky-300">{cooling.coldAisleTempC}°C</div>
                  <p className="text-[11px] text-zinc-400">
                    Pressurized sub-floor perforated tile supply at 18.5°C; ASHRAE Recommended Class A1.
                  </p>
                </div>

                {/* Hot Aisle (Exhaust) */}
                <div className="bg-[#1f0b0d] border-2 border-red-500/50 p-5 rounded space-y-2">
                  <div className="text-[10px] text-red-400 font-bold flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>HOT AISLE (EXHAUST RETURN)</span>
                  </div>
                  <div className="text-3xl font-black text-red-400">{cooling.hotAisleTempC}°C</div>
                  <p className="text-[11px] text-zinc-400">
                    Ceiling plenum chimney extraction directly into heat recovery loop.
                  </p>
                </div>
              </div>

              {/* Liquid Loop Heat Exchanger */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>DIRECT-TO-CHIP (D2C) WATER LOOP TELEMETRY</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">SUPPLY WATER TEMP</div>
                    <div className="text-lg font-bold text-cyan-400 mt-1">28.0°C</div>
                  </div>
                  <div className="p-3 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">RETURN WATER TEMP</div>
                    <div className="text-lg font-bold text-amber-400 mt-1">42.4°C</div>
                  </div>
                  <div className="p-3 bg-[#050811] border border-zinc-800">
                    <div className="text-[10px] text-zinc-500">FLOW RATE (PUMP A)</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">180 L/MIN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CRAC Blower & Chiller Status (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="dcim-rack-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase">CRAC BLOWER & CHILLER MATRIX</span>
                <span className="text-[10px] text-emerald-400 font-bold">ALL FANS ONLINE</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#050811] p-3 border border-zinc-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CRAC UNIT 01 (EC FAN):</span>
                    <strong className="text-sky-300">{cooling.cracBlowerRPM} RPM (72% SPEED)</strong>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5">
                    <div className="bg-sky-400 h-full w-[72%]" />
                  </div>
                </div>

                <div className="bg-[#050811] p-3 border border-zinc-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CRAC UNIT 02 (EC FAN):</span>
                    <strong className="text-sky-300">1420 RPM (70% SPEED)</strong>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5">
                    <div className="bg-sky-400 h-full w-[70%]" />
                  </div>
                </div>

                <div className="p-4 bg-[#090d1a] border border-zinc-800 space-y-2">
                  <div className="text-zinc-500 uppercase text-[10px]">HEAT REUSE INTEGRATION:</div>
                  <p className="text-[11px] text-zinc-300">
                    42.4°C waste hot water recycled into district heating loop, saving 340 MWh annually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
