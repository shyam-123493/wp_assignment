import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
// reactive form
  constructor(private fb: FormBuilder, private router: Router,public http:HttpClient,public auth:AuthServiceService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res && res.accessToken) {
          this.auth.saveToken(res.accessToken);  // Save the correct token 
          this.router.navigate(['/profile']); // Redirect to the profile page
          // this.toastr.success('Login successful!', 'Success');
        } else { 
          // this.toastr.error('Failed to log in, please try again!', 'Error');
        }
      },
      error: () => {
        // this.toastr.error('Invalid credentials', 'Error');
      }
    });
  }

}
