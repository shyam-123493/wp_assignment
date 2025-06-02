import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user: any;
  @Output() update = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  editedUser: any = {};

  ngOnInit() {
    this.editedUser = { ...this.user };
  }

  saveChanges() {
    this.update.emit(this.editedUser);
  }

  closePopup() {
    this.close.emit();
  }
}
