import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImportColisRecuComponent} from './Components/import-colis-recu/import-colis-recu.component';
import {LoginComponent} from './Components/login/login.component';
import {AuthGuard} from './Guards/auth/auth.guard';
import {CaissieGuard} from './Guards/caissie/caissie.guard';
import {DepotGuard} from './Guards/depot/depot.guard';
import {AddColisExpComponent} from './Components/add-colis-exp/add-colis-exp.component';
import {ListColisExpComponent} from './Components/list-colis-exp/list-colis-exp.component';
import {DashboardComponent} from './Components/admin/dashboard/dashboard.component';
import {ListColisRecuComponent} from './Components/list-colis-recu/list-colis-recu.component';
import {AppComponent} from './app.component';
import {LayoutComponent} from './Components/layout/layout.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent,},
  {
    path: '', component: LayoutComponent, children: [
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'list-colis-recu', component: ListColisRecuComponent, canActivate: [AuthGuard, CaissieGuard]},
      {path: 'import-colis-recu', component: ImportColisRecuComponent, canActivate: [AuthGuard, CaissieGuard]},
      {path: 'add-colis-exp', component: AddColisExpComponent, canActivate: [AuthGuard, DepotGuard]},
      {path: 'list-colis-exp', component: ListColisExpComponent, canActivate: [AuthGuard, DepotGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
