import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {DataService} from 'src/app/_service/data.service'
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  con_series;
  rec_series;
  death_series;
  xAxis;
  lineChartData : ChartDataSets[];
  lineChartLabels: Label[];
  chartReady = false;
  seriesValue;
  timeSeries;
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,255,0.28)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(255,255,255,0.28)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,255,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  constructor(private dataService: DataService) {
    this.dataService.getDailyData().subscribe((response) => {
      this.timeSeries = response.cases_time_series;
      this.createChart();
      this.chartReady = true;
      })
   
   }

  ngOnInit(): void {
  }
  createChart(){
    this.seriesValue = {
      confirmed:{
        series:{
          data: this.timeSeries.map((v)=>{
            return Number(v.totalconfirmed);
          }),
          label: "Confirmed"
        },
        xAxis: this.timeSeries.map((v) => {
          return v.date.substring(0, 6).replace(' ', '').replace('-', '');
        })  
       
      },
      active:{
        series:{
          data: this.timeSeries.map((v)=>{
            return (Number(v.totalconfirmed)-Number(v.totalrecovered)-Number(v.totaldeceased));
          }),
          label: "Active"
        },
        xAxis: this.timeSeries.map((v) => {
          return v.date.substring(0, 6).replace(' ', '').replace('-', '');
        })  

      },
      recovered:{
        series:{
          data: this.timeSeries.map((v)=>{
            return Number(v.totalrecovered);
          }),
          label: "Recovered"
        },
        xAxis: this.timeSeries.map((v) => {
          return v.date.substring(0, 6).replace(' ', '').replace('-', '');
        })
      },
      deceased:{
        series:{
          data: this.timeSeries.map((v)=>{
            return Number(v.totaldeceased);
          }),
          label: "Deceased"
        },
        xAxis: this.timeSeries.map((v) => {
          return v.date.substring(0, 6).replace(' ', '').replace('-', '');
        })
      }
    }
    this.con_series = this.seriesValue.confirmed.series;
    this.rec_series = this.seriesValue.recovered.series;
    this.death_series = this.seriesValue.deceased.series;
    this.xAxis = this.seriesValue.confirmed.xAxis;
    this.lineChartData = [
      {
        data: this.con_series.data,
        label: 'Confirmed'
      },
      {
        data: this.rec_series.data,
        label:  'Recovered'
      },
      {
        data: this.death_series.data,
        label:  'Deceased'
      }
    ];
    this.lineChartLabels = this.xAxis? this.xAxis : [];

  }

}
