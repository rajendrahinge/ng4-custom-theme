import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginService } from './pages/login/login.service';

import { AuthguardGuard } from './authguard.guard';


const appRoutes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    data:{ title: 'Login'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard List' }
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    AsyncLocalStorageModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule    
  ],  
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,    
    LoginComponent,
    PageNotFoundComponent,
  ],
  providers: [
    LoginService, 
    AuthguardGuard
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

