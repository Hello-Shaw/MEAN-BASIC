
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from "./components/register/register.component";
import { HeaderComponent } from './components/header/header.component';
import {GiftComponent} from "./components/gift/gift.component";
import {AuthGuard} from "./auth.guard";



const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HeaderComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'gift',
    component: GiftComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class RoutingModule { }

export const routingComponents=[HeaderComponent,RegisterComponent,GiftComponent];
