import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map, tap,retry, shareReplay } from 'rxjs/operators';
import {API} from '../models/API'
import {CovidData, DistrictWise} from '../models/model'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getDailyData():Observable<CovidData>{
    return this.http.get<CovidData>(API.dashboardAPI).pipe(
      retry(5)
    );
  }
  getDistrictData():Observable<any>{
    return this.http.get<DistrictWise[]>(API.stateDistrictWiseV2).pipe(
      retry(5)
    )
  }
}
