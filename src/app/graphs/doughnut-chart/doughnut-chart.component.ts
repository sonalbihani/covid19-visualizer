import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/_service/data.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  series;
  chartReady = false;
  public pieChartLabels: string[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  states;
  constructor(private dataService: DataService) {
    this.dataService.getDailyData().subscribe((response) => {
      this.states = response.statewise;
      this.states = this.states.splice(1);
      console.log(this.states);
      this.series= {
        data: [Number(this.states[0].active),Number(this.states[0].recovered),Number(this.states[0].deaths)],
        labels: ['Active','Recovered','Deaths']
      }
        
      this.pieChartLabels = this.series.labels;
      this.pieChartData = this.series.data;
      this.chartReady = true;
  });
   }

  ngOnInit(): void {
  }

}
