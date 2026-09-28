'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Server,
  Zap,
  RotateCw,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HardDrive
} from 'lucide-react';
import { useDcim } from '@/context/DcimContext';

export default function BareMetalInventoryPage() {
  const { servers, rebootServer } = useDcim();

  return (
    <div className="min-h-screen bg-[#030712] text-[#e2e8f0] pb-24 font-mono">
      {/* Header */}
      <section className="bg-[#070b16] border-b border-sky-950/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-bold">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>OUT-OF-BAND BMC & IPMI 2.0 HARDWARE MANAGEMENT CONSOLE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">
              BARE-METAL <span className="text-sky-400">NODE INVENTORY</span>
            </h1>
          </div>

          <div className="text-xs text-zinc-400 bg-[#080d1a] border border-zinc-800 p-2.5">
            TOTAL NODES: <strong className="text-white font-bold">{servers.length} ACTIVE COMPUTERS</strong>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="dcim-rack-panel p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-bold text-white uppercase">ENTERPRISE COMPUTE CLUSTERS & ACCELERATORS</span>
            <span className="text-[10px] text-zinc-500">SORT BY RACK MOUNT U-SLOT</span>
          </div>

          <div className="space-y-4">
            {servers.map((srv) => (
              <div
                key={srv.id}
                className="p-5 bg-[#050811] border border-zinc-800/80 rounded-lg hover:border-sky-500/50 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-black border border-sky-500/40">
                      {srv.id}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base">{srv.name}</h3>
                      <span className="text-[11px] text-zinc-500">MOUNTED AT {srv.rackId} // U{srv.unitStartU}-U{srv.unitStartU + srv.unitHeightU - 1}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                      {srv.status}
                    </span>
                    <button
                      onClick={() => rebootServer(srv.id)}
                      className="px-3.5 py-1.5 bg-[#101726] hover:bg-sky-500 hover:text-black text-sky-300 border border-sky-500/40 rounded text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>BMC HARD REBOOT</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-300 pt-2 border-t border-zinc-900">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px]">PROCESSOR ARCHITECTURE:</span>
                    <div className="font-bold text-white">{srv.cpuModel}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px]">AI ACCELERATOR / GPU:</span>
                    <div className="font-bold text-sky-300">{srv.gpuModel || 'NONE (CPU-ONLY NODE)'}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px]">MEMORY & DISK:</span>
                    <div className="font-bold text-white">{srv.ramGB} GB ECC DDR5 • 4x 7.68TB NVMe</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-4">
                    <span>DRAWS: <strong className="text-white">{srv.powerDrawWatts} W</strong></span>
                    <span>CORE: <strong className="text-amber-400">{srv.cpuTempC}°C</strong></span>
                  </div>
                  <span className="text-amber-300 text-[11px] truncate max-w-sm">WORKLOAD: {srv.workload}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
