import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, throwError, timeout } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any[] = [];
  filtered: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  selectedUser: any = null;
  showEditPopup: boolean = false;
  editUserData: any = null;

  constructor(public commonService: CommonServiceService, public router: Router) { }

  ngOnInit() {
    if (this.commonService?.userData) {
      this.filtered = this.commonService?.userData || "";
    } else {
      this.getUserData();
    }
  }

  getUserData(): void {
    this.isLoading = true;
    this.commonService?.getUserData().pipe(
      timeout(10000),
      catchError(err => {
        if (err?.name === 'TimeoutError') {
          this.router.navigate(['/oops-try-again']);
          this.isLoading = false;
          return of(null);
        } else {
          return throwError(() => err);
        }
      })
    ).subscribe({
      next: (res) => {
        if (res) {
          this.users = this.filtered = res.users;
          this.commonService.userData = this.users;
          console.log('User data:', this.users);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading = false;
      }
    });
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filtered.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  filterUsers() {
    const search = this.searchTerm.toLowerCase();
    this.filtered = this.users.filter(
      user =>
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search)
    );
    this.currentPage = 1; // Reset to first page after filtering
  }
  openDetails(user: any) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = null;
    this.editUserData = null;
  }
  onEdit(user: any) {
    this.editUserData = { ...user };
    this.showEditPopup = true;
  }

  onUpdate(updatedUser: any) {
    console.log('Updated user:', updatedUser);
    this.showEditPopup = false;
    this.getUserData();
    // Optionally send to API here
  }

  onClosePopup() {
    this.showEditPopup = false;
  }
}
