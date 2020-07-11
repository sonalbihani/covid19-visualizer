import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StateWiseComponent } from './state-wise/state-wise.component';
import { StateDetailsComponent } from './state-details/state-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http'
import { AuthGuard } from './_service/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LineChartComponent } from './graphs/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PieChartComponent } from './graphs/pie-chart/pie-chart.component';
import { BarChartComponent } from './graphs/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './graphs/doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StateWiseComponent,
    StateDetailsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
