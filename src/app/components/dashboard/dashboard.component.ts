import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToasterComponent } from 'src/app/popup/toaster/toaster.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToasterserviceService } from 'src/app/services/toasterservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user: any;
  error: any;

  constructor(private http: HttpClient, private auth: AuthServiceService,public toaster:ToasterserviceService) {}
  ngOnInit() {
    const token = this.auth.getToken();  // Get token from AuthService 
    if (!token) {
      console.error('No token found!');
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('https://dummyjson.com/auth/me', { headers }).subscribe({
      next: (res) => {
        this.user = res;  //   fetched Data
        console.log('Profile fetched:', res);
      },
      error: (err) => {
        console.error('Failed to fetch profile:', err);
        this.error = 'Failed to fetch profile. Token might be expired or invalid.';
      }
    });
  }
  logout() {
    this.auth.logout();
    this.toaster.showToast('Logout successful!', 'success');
  }
}
