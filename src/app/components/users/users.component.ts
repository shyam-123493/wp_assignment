import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any[] = [];
  filtered: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://dummyjson.com/users').subscribe(res => {
      this.users = this.filtered = res.users;
    });
  }
//filter by name
  filterUsers() {
    this.filtered = this.users.filter(user => user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
