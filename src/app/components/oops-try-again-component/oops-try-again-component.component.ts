import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oops-try-again-component',
  templateUrl: './oops-try-again-component.component.html',
  styleUrls: ['./oops-try-again-component.component.scss']
})
export class OopsTryAgainComponentComponent {
  constructor(private router: Router) {}
  
  retry() {
    this.router.navigate(['/dashboard']); 
  }
}
