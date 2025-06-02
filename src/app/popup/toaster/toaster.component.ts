import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
  show = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.message && this.message) {
      this.show = true;

      // Auto-hide after 2 seconds
      setTimeout(() => {
        this.show = false;
      }, 2000);
    }
  }
}
