import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/_service/data.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  series;
  chartReady = false;
  public pieChartLabels: string[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  states;
  constructor(private dataService: DataService) {
    this.dataService.getDailyData().subscribe((response) => {
      this.states = response.statewise;
      this.states = this.states.splice(1);
      console.log(this.states);
      this.series = {
        data: this.states.map((v) => {
          return Number(v.confirmed);
        }),
        labels: this.states.map((v)=>{
          return v.statecode;
        }) 
      }
      this.pieChartLabels = this.series.labels;
      this.pieChartData = this.series.data;
      this.chartReady = true;
  });
   }

  ngOnInit(): void {

  }
  createChart(){
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
    // this.pieChartData =  this.states.splice(1).map((v) => {
    //   return Number(v.confirmed);
    // });
    // var a  = this.states.splice(1).map((v)=>{
    //   console.log(v);
    //   return v.statecode;
    // });
    

  }

}
