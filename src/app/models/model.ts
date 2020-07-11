export interface CasesTimeSeries{
  dailyconfirmed: string,
	dailydeceased: string,
	dailyrecovered: string,
	date: string,
	totalconfirmed: string,
	totaldeceased: string,
	totalrecovered: string
    
}
export interface Statewise{
    active?: string | number,
    confirmed?: string | number,
    deaths?: string | number,
    deltaconfirmed?: string | number,
    deltadeaths?: string | number,
    deltarecovered?: string | number,
    lastupdatedtime?: string | number,
    migratedother?: string | number,
    recovered?: string | number,
    state?: string | number,
    statecode?: string | number,
    // statenotes: string | number
}

export interface DistrictWise {
    state: string;
    districtData: DistrictData[];
  }
  
export interface DistrictData {
    district: string;
    confirmed: number;
    active: number;
    recovered: number;
    deceased: number;
    lastupdatedtime: string;
    delta: Delta;
  }
  export interface Delta {
    confirmed: number;
    deceased: number;
    recovered: number;
  }
  export interface CovidData {
    cases_time_series: CasesTimeSeries[];
    statewise: Statewise[];
    // tested: Tested[];
  }