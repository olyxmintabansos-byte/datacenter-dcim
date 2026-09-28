'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServerRack,
  ServerUnit,
  CoolingZone,
  PowerSystem,
  DcimContextType
} from '@/types/dcim';

const SEED_RACKS: ServerRack[] = [
  {
    id: 'RACK-A01',
    name: 'Rack Alpha-01 (GPU Cluster)',
    hallName: 'Data Hall 1 (AI Compute)',
    maxUnitsU: 42,
    totalPowerKW: 28.4,
    inletTempC: 18.5,
    exhaustTempC: 34.2,
    serversCount: 8,
  },
  {
    id: 'RACK-A02',
    name: 'Rack Alpha-02 (High-Memory DB)',
    hallName: 'Data Hall 1 (AI Compute)',
    maxUnitsU: 42,
    totalPowerKW: 18.2,
    inletTempC: 19.1,
    exhaustTempC: 31.8,
    serversCount: 12,
  },
  {
    id: 'RACK-A03',
    name: 'Rack Alpha-03 (Edge CDN Cache)',
    hallName: 'Data Hall 2 (Network Core)',
    maxUnitsU: 42,
    totalPowerKW: 14.6,
    inletTempC: 18.8,
    exhaustTempC: 29.5,
    serversCount: 14,
  },
  {
    id: 'RACK-A04',
    name: 'Rack Alpha-04 (NVMe Ceph SAN)',
    hallName: 'Data Hall 2 (Network Core)',
    maxUnitsU: 42,
    totalPowerKW: 22.0,
    inletTempC: 19.4,
    exhaustTempC: 33.1,
    serversCount: 10,
  },
];

const SEED_SERVERS: ServerUnit[] = [
  {
    id: 'SRV-101',
    name: 'DGX-H100 Node 01',
    rackId: 'RACK-A01',
    unitStartU: 1,
    unitHeightU: 8,
    cpuModel: 'Dual AMD EPYC 9654 (192 Cores)',
    gpuModel: '8x NVIDIA H100 80GB SXM5',
    ramGB: 2048,
    powerDrawWatts: 10200,
    cpuTempC: 58.2,
    status: 'OPTIMAL_ONLINE',
    workload: 'LLM Distributed Training (70B MoE)',
  },
  {
    id: 'SRV-102',
    name: 'DGX-H100 Node 02',
    rackId: 'RACK-A01',
    unitStartU: 9,
    unitHeightU: 8,
    cpuModel: 'Dual AMD EPYC 9654 (192 Cores)',
    gpuModel: '8x NVIDIA H100 80GB SXM5',
    ramGB: 2048,
    powerDrawWatts: 10400,
    cpuTempC: 61.4,
    status: 'OPTIMAL_ONLINE',
    workload: 'Vision Embedding Fine-Tuning',
  },
  {
    id: 'SRV-103',
    name: 'Inference Head 01',
    rackId: 'RACK-A01',
    unitStartU: 17,
    unitHeightU: 2,
    cpuModel: 'Intel Xeon Platinum 8490H',
    gpuModel: '4x NVIDIA L40S 48GB',
    ramGB: 1024,
    powerDrawWatts: 1850,
    cpuTempC: 49.8,
    status: 'OPTIMAL_ONLINE',
    workload: 'TensorRT-LLM Low Latency Engine',
  },
  {
    id: 'SRV-104',
    name: 'Top of Rack Switch 100GbE',
    rackId: 'RACK-A01',
    unitStartU: 41,
    unitHeightU: 2,
    cpuModel: 'Broadcom Tomahawk 4 ASIC',
    ramGB: 64,
    powerDrawWatts: 650,
    cpuTempC: 44.0,
    status: 'OPTIMAL_ONLINE',
    workload: 'InfiniBand Quantum-2 HDR Spine',
  },
];

const SEED_COOLING: CoolingZone = {
  zoneId: 'COOL-01',
  name: 'Containment Hot/Cold Aisle Loop',
  coldAisleTempC: 18.5,
  hotAisleTempC: 34.2,
  cracBlowerRPM: 1450,
  chillerCop: 6.4,
  waterLoopDeltaT: 7.2,
};

const SEED_POWER: PowerSystem = {
  totalFacilityLoadMW: 1.84,
  pueRating: 1.12,
  upsFeedA_LoadPct: 48,
  upsFeedB_LoadPct: 52,
  dieselGenReservesHours: 72,
  utilityFeedStatus: 'GRID_NOMINAL',
};

const LOCAL_STORAGE_KEY = 'datacenter_dcim_state_v1';

const DcimContext = createContext<DcimContextType | undefined>(undefined);

export function DcimProvider({ children }: { children: React.ReactNode }) {
  const [racks] = useState<ServerRack[]>(SEED_RACKS);
  const [servers, setServers] = useState<ServerUnit[]>(SEED_SERVERS);
  const [cooling] = useState<CoolingZone>(SEED_COOLING);
  const [power] = useState<PowerSystem>(SEED_POWER);
  const [selectedRackId, setSelectedRackId] = useState<string>('RACK-A01');

  // Persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.servers) setServers(parsed.servers);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ servers }));
    } catch {}
  }, [servers]);

  const rebootServer = (id: string) => {
    setServers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: 'MAINTENANCE_DRAIN', cpuTempC: 35.0 }
          : s
      )
    );
    setTimeout(() => {
      setServers((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: 'OPTIMAL_ONLINE', cpuTempC: 56.0 }
            : s
        )
      );
    }, 4000);
  };

  return (
    <DcimContext.Provider
      value={{
        racks,
        servers,
        cooling,
        power,
        selectedRackId,
        setSelectedRackId,
        rebootServer,
      }}
    >
      {children}
    </DcimContext.Provider>
  );
}

export function useDcim() {
  const context = useContext(DcimContext);
  if (!context) throw new Error('useDcim must be used within DcimProvider');
  return context;
}
