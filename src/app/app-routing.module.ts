import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthguardService } from './services/authguard.service';
import { OopsTryAgainComponentComponent } from './components/oops-try-again-component/oops-try-again-component.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthguardService] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthguardService] },
  { path: 'oops-try-again', component: OopsTryAgainComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
