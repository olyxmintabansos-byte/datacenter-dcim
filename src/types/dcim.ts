export type ServerStatus = 'OPTIMAL_ONLINE' | 'THERMAL_THROTTLING' | 'MAINTENANCE_DRAIN' | 'OFFLINE_HALTED';

export interface ServerUnit {
  id: string;
  name: string;
  rackId: string;
  unitStartU: number;
  unitHeightU: number;
  cpuModel: string;
  gpuModel?: string;
  ramGB: number;
  powerDrawWatts: number;
  cpuTempC: number;
  status: ServerStatus;
  workload: string;
}

export interface ServerRack {
  id: string;
  name: string;
  hallName: string;
  maxUnitsU: number; // 42U standard
  totalPowerKW: number;
  inletTempC: number;
  exhaustTempC: number;
  serversCount: number;
}

export interface CoolingZone {
  zoneId: string;
  name: string;
  coldAisleTempC: number;
  hotAisleTempC: number;
  cracBlowerRPM: number;
  chillerCop: number;
  waterLoopDeltaT: number;
}

export interface PowerSystem {
  totalFacilityLoadMW: number;
  pueRating: number;
  upsFeedA_LoadPct: number;
  upsFeedB_LoadPct: number;
  dieselGenReservesHours: number;
  utilityFeedStatus: 'GRID_NOMINAL' | 'UPS_DISCHARGE' | 'GENSET_SYNCHRONIZED';
}

export interface DcimContextType {
  racks: ServerRack[];
  servers: ServerUnit[];
  cooling: CoolingZone;
  power: PowerSystem;
  selectedRackId: string;
  setSelectedRackId: (id: string) => void;
  rebootServer: (id: string) => void;
}
