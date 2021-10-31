import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { LoginGuard } from './guards/login-guard.guard';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
 {path: 'home', component: HomeComponent},
 {path: 'sign-in', component: SignInComponent, canActivate: [LoginGuard]},
 {path: 'user', canActivate: [AuthGuard], children: [
   {path: 'dashboard', component: DashboardComponent},
 ]},

 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
