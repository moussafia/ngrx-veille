import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../user';
import { getShowUserId, getUsers } from '../state/user.reducer';
import { Observable } from 'rxjs';
import * as userAction from '../state/user.action'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  user$?:Observable<User[]>;
  showId$?:Observable<boolean>

constructor(private store: Store<User[]>){}
ngOnInit(): void {
  this.store.dispatch(userAction.loadUsers())
  this.user$ = this.store.select(getUsers);
  this.showId$ = this.store.select(getShowUserId);
}
hideIdUsers() {
  this.store.dispatch(userAction.toggleUserId());
}
}
