import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {OrdersComponent} from "./orders/orders.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
