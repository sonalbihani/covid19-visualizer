import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_service/auth.guard';
import { StateWiseComponent } from './state-wise/state-wise.component';
import { StateDetailsComponent } from './state-details/state-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'state-wise',
    component: StateWiseComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'state-details/:state',
    component: StateDetailsComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
