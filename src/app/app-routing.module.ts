import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from 'src/app/dashboard/dashboard.component';
import {CustomerComponent} from 'src/app/customer/customer.component';
import {ProductComponent} from 'src/app/product/product.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'customer',component:CustomerComponent},
    {path:'product',component:ProductComponent},
    {path:'**',redirectTo:'customer'}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
