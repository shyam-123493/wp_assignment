import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wp_assignment';
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
