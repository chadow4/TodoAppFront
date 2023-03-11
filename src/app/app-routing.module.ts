import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./Pages/home/home.component";
import {NotFoundComponent} from "./Pages/not-found/not-found.component";
import {DashboardComponent} from "./Pages/dashboard/dashboard.component";
import {LoginComponent} from "./Pages/login/login.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {ConnectedGuard} from "./guard/connected-guard";
import {DisconnectedGuard} from "./guard/disconnected-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [DisconnectedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ConnectedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ConnectedGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
