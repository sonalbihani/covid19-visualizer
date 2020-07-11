import { Component, OnInit } from '@angular/core';
import {CasesTimeSeries,Statewise} from '../models/model';
import {DataService} from '../_service/data.service'
import {ActivatedRoute, Router} from '@angular/router'
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-state-wise',
  templateUrl: './state-wise.component.html',
  styleUrls: ['./state-wise.component.css']
})
export class StateWiseComponent implements OnInit {
  states: Statewise[];
  sortedStates: Statewise[];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.load_data();
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  load_data(){
    this.dataService.getDailyData().subscribe((response) => {
      this.states = response.statewise.slice(1).map((v) => {
        return {
          active: Number(v.active),
          confirmed: Number(v.confirmed),
          deaths: Number(v.deaths),
          deltaconfirmed: Number(v.deltaconfirmed),
          deltadeaths: Number(v.deltadeaths),
          deltarecovered: Number(v.deltarecovered),
          lastupdatedtime: v.lastupdatedtime,
          recovered: Number(v.recovered),
          state: v.state,
          statecode: v.statecode,
        };
      });
      this.sortedStates = this.states.slice();
  });
  }  
  sortStatesData(sort: Sort) {
    const data = this.states.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedStates = data;
      return;
    }
    this.sortedStates = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'state':
          return this.compare(a.state, b.state, isAsc);
        case 'confirmed':
          return this.compare(a.confirmed, b.confirmed, isAsc);
        case 'recovered':
          return this.compare(a.recovered, b.recovered, isAsc);
        case 'active':
          return this.compare(a.active, b.active, isAsc);
        case 'deaths':
          return this.compare(a.deaths, b.deaths, isAsc);
        default:
          return 0;
      }
    });
  }

  goToState(state: Statewise){
    this.router.navigateByUrl('state-details/' + state.state);
  }

}
