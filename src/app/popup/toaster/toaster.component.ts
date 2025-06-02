import { Component, Input, SimpleChanges } from '@angular/core';
import { ToasterserviceService } from 'src/app/services/toasterservice.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  message = '';
  type: 'success' | 'error' = 'success';
  show = false;

  constructor(private toasterService: ToasterserviceService) {}

  ngOnInit(): void {
    this.toasterService.toastState$.subscribe(toast => {
      if (toast) {
        this.message = toast.message;
        this.type = toast.type;
        this.show = true;

        // Hide automatically after 2 seconds
        setTimeout(() => {
          this.show = false;
        }, 2000);
      }
    });
  }
}
