import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent } from 'src/app/popup/toaster/toaster.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ToasterserviceService } from 'src/app/services/toasterservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
// reactive form
  constructor(private fb: FormBuilder, private router: Router,public http:HttpClient,public auth:AuthServiceService,public toaster:ToasterserviceService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res && res?.accessToken) {
          console.log(res,"response ")
          this.auth.saveToken(res.accessToken); 
          this.router.navigate(['/dashboard']); 
          this.toaster.showToast('Login successful!', 'success'); 
               }
           else { 
            this.toaster.showToast('Login failed!', 'error');        
        }
      },
      error: () => {
        this.toaster.showToast('Login failed!', 'error');
      }
    });
  }

}
