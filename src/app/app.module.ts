import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToasterComponent } from './popup/toaster/toaster.component';
import { OopsTryAgainComponentComponent } from './components/oops-try-again-component/oops-try-again-component.component';
import { UserDetailsComponent } from './popup/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    UsersComponent,
    NavbarComponent,
    ToasterComponent,
    OopsTryAgainComponentComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  
    RouterModule.forRoot([]), 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
