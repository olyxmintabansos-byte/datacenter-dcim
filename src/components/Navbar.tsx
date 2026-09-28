'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Server,
  Thermometer,
  Zap,
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  Radio,
  Power
} from 'lucide-react';
import { useDcim } from '@/context/DcimContext';

export default function Navbar() {
  const pathname = usePathname();
  const { power, cooling } = useDcim();

  const links = [
    { href: '/', label: '42U RACKS', sub: 'FLOOR MATRIX' },
    { href: '/thermal/', label: 'CFD COOLING', sub: 'LIQUID DELTA-T' },
    { href: '/servers/', label: 'BARE-METAL', sub: 'BMC IPMI CLUSTERS' },
    { href: '/power/', label: 'UPS & 2N POWER', sub: 'DIESEL GENSETS' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur-md border-b border-sky-950/80 font-mono">
      {/* Top LED Telemetry Ribbon */}
      <div className="bg-[#02040a] border-b border-[#111827] px-4 py-1 text-xs text-zinc-400 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-sky-400" />
            <span>HYPERSCALE DCIM INFRASTRUCTURE // ASHRAE TC 9.9 CLASS A1</span>
          </div>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-300">
            LOAD: <strong className="text-white">{power.totalFacilityLoadMW} MW</strong> • PUE: <strong className="text-emerald-400">{power.pueRating}</strong> (SUPER-EFFICIENT)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 led-blink-fast" />
            <span>COLD AISLE: {cooling.coldAisleTempC}°C</span>
          </span>
          <span className="text-sky-400">TITAN #47 // STYLE #14 DARK MODE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#0b1329] border border-sky-500/50 flex items-center justify-center shadow-lg group-hover:border-sky-400 transition-all">
              <Server className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                DATACENTER <span className="text-sky-400">DCIM</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  TIER IV
                </span>
              </div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest">
                42U RACK INFRASTRUCTURE TELEMETRY
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg transition-all flex flex-col items-center border ${
                    active
                      ? 'bg-[#0f172a] text-sky-300 border-sky-500/60 shadow-md shadow-sky-500/10'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-[#080d1a]'
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[9px] text-zinc-500">{item.sub}</span>
                </Link>
              );
            })}
          </nav>

          {/* Power Redundancy Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080e1e] border border-zinc-800 text-xs text-zinc-300">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">2N DUAL FEED A/B ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
