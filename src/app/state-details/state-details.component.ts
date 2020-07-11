import { Component, OnInit } from '@angular/core';
import {CasesTimeSeries,Statewise, DistrictData} from '../model';
import {DataService} from '../_service/data.service'
import {ActivatedRoute, Router} from '@angular/router'
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css']
})
export class StateDetailsComponent implements OnInit {
  stateName;
  districts: DistrictData[];
  sortedDistricts: DistrictData[];
  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.stateName = params['state'];      
    });
    this.load_data();
  }

  load_data(){
    this.dataService.getDistrictData().subscribe((response) => {
      console.log(response);
      this.districts = response.find(
        (v) => v.state === this.stateName
      ).districtData;
      this.sortedDistricts = this.districts.slice();
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  sortDistrictData(sort: Sort){
    const data = this.districts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDistricts = data;
      return;
    }
    this.sortedDistricts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'district':
          return this.compare(a.district, b.district, isAsc);
        case 'confirmed':
          return this.compare(a.confirmed, b.confirmed, isAsc);
        case 'recovered':
          return this.compare(a.recovered, b.recovered, isAsc);
        case 'active':
          return this.compare(a.active, b.active, isAsc);
        case 'deaths':
          return this.compare(a.deceased, b.deceased, isAsc);
        default:
          return 0;
      }
    });
    console.log(this.sortDistrictData);
  }

}
