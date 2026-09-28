'use client';

import React from 'react';
import Link from 'next/link';
import {
  Server,
  Zap,
  Thermometer,
  Cpu,
  Layers,
  Activity,
  ChevronRight,
  ShieldCheck,
  Radio,
  Power,
  RotateCw
} from 'lucide-react';
import { useDcim } from '@/context/DcimContext';

export default function RackMatrixPage() {
  const { racks, servers, selectedRackId, setSelectedRackId, rebootServer, power, cooling } = useDcim();
  const currentRack = racks.find((r) => r.id === selectedRackId) || racks[0];
  const rackServers = servers.filter((s) => s.rackId === currentRack.id);

  // 42U Slots array from 42 down to 1
  const uSlots = Array.from({ length: 42 }, (_, i) => 42 - i);

  return (
    <div className="min-h-screen bg-[#030712] text-[#e2e8f0] pb-24 font-mono">
      {/* Infrastructure Metrics Header */}
      <section className="bg-[#070b16] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold mb-3">
              <Server className="w-3.5 h-3.5 text-sky-400" />
              <span>FACILITY DCIM // DATA HALL 1 (HIGH-DENSITY AI COMPUTE)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              42U SERVER RACK <span className="text-sky-400">TELEMETRY</span>
            </h1>
            <p className="mt-2 text-zinc-400 max-w-2xl text-xs sm:text-sm">
              Real-time thermal envelope, power distribution unit (PDU) load, and chassis telemetry for 42U high-density compute enclosures.
            </p>
          </div>

          {/* Facility Status HUD */}
          <div className="grid grid-cols-3 gap-2 bg-[#050811] border border-zinc-800 p-3 text-center text-xs">
            <div className="p-2 border-r border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">PUE RATING</div>
              <div className="text-xl font-black text-emerald-400">{power.pueRating}</div>
              <div className="text-[9px] text-zinc-500 mt-0.5">ASHRAE GOLD</div>
            </div>
            <div className="p-2 border-r border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">FACILITY LOAD</div>
              <div className="text-xl font-black text-white">{power.totalFacilityLoadMW} MW</div>
              <div className="text-[9px] text-zinc-500 mt-0.5">2N BACKED</div>
            </div>
            <div className="p-2">
              <div className="text-[10px] text-zinc-500 uppercase">RACK INLET</div>
              <div className="text-xl font-black text-sky-400">{currentRack.inletTempC}°C</div>
              <div className="text-[9px] text-zinc-500 mt-0.5">COLD AISLE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: 42U Rack Visualizer & Telemetry */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 42U Vertical Server Rack Visualization (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="dcim-rack-panel p-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase">{currentRack.name}</h2>
                  <span className="text-[10px] text-zinc-500">{currentRack.hallName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-sky-400 font-bold">{currentRack.totalPowerKW} kW PDU LOAD</span>
                </div>
              </div>

              {/* The 42U Rack Chassis Frame */}
              <div className="border-4 border-zinc-800 bg-[#020307] p-2 rounded relative shadow-2xl">
                {/* Rack Rail Mounting Holes */}
                <div className="space-y-1">
                  {uSlots.map((u) => {
                    // Check if server occupies this slot
                    const server = rackServers.find(
                      (s) => u >= s.unitStartU && u < s.unitStartU + s.unitHeightU
                    );
                    const isTopSlot = server && u === server.unitStartU + server.unitHeightU - 1;

                    return (
                      <div
                        key={u}
                        className={`h-6 flex items-center px-2 text-[10px] border transition-colors ${
                          server
                            ? 'bg-[#0f172a] border-sky-500/40 text-sky-200'
                            : 'bg-[#04060c] border-zinc-900 text-zinc-600'
                        }`}
                      >
                        <span className="w-8 text-[9px] text-zinc-500 font-bold border-r border-zinc-800 pr-1">
                          {u}U
                        </span>

                        {isTopSlot && (
                          <div className="flex-1 flex items-center justify-between ml-2">
                            <span className="font-bold truncate text-white">
                              {server.name} ({server.unitHeightU}U)
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sky-300 font-mono text-[9px]">
                                {server.powerDrawWatts} W
                              </span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 led-blink-fast" />
                            </div>
                          </div>
                        )}

                        {!server && (
                          <span className="ml-2 text-[9px] text-zinc-700 italic">EMPTY 1U BLANKING PANEL</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rack Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-zinc-800">
                {racks.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRackId(r.id)}
                    className={`p-2 border text-xs font-bold transition-all ${
                      r.id === selectedRackId
                        ? 'bg-sky-500 text-black border-sky-400 shadow-md'
                        : 'bg-[#080d1a] text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {r.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bare-Metal Server Chassis Telemetry (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="dcim-rack-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase">INSTALLED BARE-METAL COMPUTE NODES</span>
                <span className="text-[10px] text-zinc-500">{rackServers.length} NODES OCCUPYING 20U</span>
              </div>

              <div className="space-y-4">
                {rackServers.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 bg-[#050811] border border-zinc-800/80 rounded hover:border-sky-500/50 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/40">
                          {srv.id}
                        </span>
                        <h3 className="font-bold text-white text-sm">{srv.name}</h3>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                        {srv.status}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 space-y-1">
                      <div>CPU: <strong className="text-white">{srv.cpuModel}</strong></div>
                      {srv.gpuModel && <div>GPU: <strong className="text-sky-300">{srv.gpuModel}</strong></div>}
                      <div>RAM: <strong className="text-white">{srv.ramGB} GB ECC DDR5</strong></div>
                      <div>WORKLOAD: <span className="text-amber-300">{srv.workload}</span></div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500">POWER: <strong className="text-white">{srv.powerDrawWatts} W</strong></span>
                        <span className="text-zinc-500">TEMP: <strong className="text-amber-400">{srv.cpuTempC}°C</strong></span>
                      </div>

                      <button
                        onClick={() => rebootServer(srv.id)}
                        className="px-3 py-1 bg-[#101726] hover:bg-sky-500 hover:text-black text-sky-300 border border-sky-500/40 rounded text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>IPMI POWER CYCLE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
