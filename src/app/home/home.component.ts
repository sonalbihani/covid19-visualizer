import { Component, OnInit } from '@angular/core';
import {CasesTimeSeries,Statewise} from '../models/model';
import {DataService} from '../_service/data.service'
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeSeries: CasesTimeSeries[];
  state_data: Statewise[];
  total_today: Statewise;
  stateName = 'Total';
  seriesValue;
  constructor( private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.load_data();
  }
  

  load_data(){
    this.dataService.getDailyData().subscribe((response) => {
    this.total_today = response.statewise.find((v) => v.state === this.stateName);
    this.timeSeries = response.cases_time_series;
    // this.load_graphs();
    })
  }
}
