import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/_service/data.service'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  timeSeries;
  chartReady = false;
  seriesValue;
  xAxis;
  con_series;
  death_series;
  rec_series;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData : ChartDataSets[];
  barChartLabels: Label[];
  barChartColors: Color[] = [
    {
      backgroundColor: 'blue',
    },
    {
      backgroundColor: 'green',
    },
    {
      backgroundColor: 'red',
    },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  constructor(private dataService: DataService) {
    this.dataService.getDailyData().subscribe((response) => {
      this.timeSeries = response.cases_time_series;
      console.log(this.timeSeries);
      this.seriesValue = {
        confirmed:{
          series:{
            data: this.timeSeries.map((v)=>{
              return Number(v.dailyconfirmed);
            }),
            label: "Confirmed"
            },
          xAxis: this.timeSeries.map((v)=>{
            return v.date.substring(0, 6).replace(' ', '').replace('-', '');
          })
        },
        recovered:{
          series:{
            data: this.timeSeries.map((v)=>{
              return Number(v.dailyrecovered);
            }),
            label: "Recovered"
          },
          xAxis: this.timeSeries.map((v)=>{
            return v.date.substring(0, 6).replace(' ', '').replace('-', '');
          })
        },
        deceased:{
          series:{
            data: this.timeSeries.map((v)=>{
              return Number(v.dailydeceased);
            }),
            label: "Deceased"
          },
          xAxis: this.timeSeries.map((v)=>{
            return v.date.substring(0, 6).replace(' ', '').replace('-', '');
          })
        }
      }  
      this.con_series = this.seriesValue.confirmed.series;
    this.rec_series = this.seriesValue.recovered.series;
    
    this.death_series = this.seriesValue.deceased.series;
    this.xAxis = this.seriesValue.confirmed.xAxis;
    this.barChartData = [
      {
        data: this.con_series.data.slice(this.con_series.data.length-120),
        label: 'Confirmed',
        // stack: 'a'
      },
      {
        data: this.rec_series.data.slice(this.rec_series.data.length-120),
        label:  'Recovered',
        // stack: 'a'
      },
      {
        data: this.death_series.data.slice(this.death_series.data.length-120),
        label:  'Deceased',
        // stack: 'a'
      }
    ];
    this.barChartLabels = this.xAxis? this.xAxis.slice(this.xAxis.length-120) : [];
      this.chartReady = true;
      });
   
   }

  ngOnInit(): void {
  }

}
