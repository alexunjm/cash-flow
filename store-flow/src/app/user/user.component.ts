import { GlobalState } from '../store/global-state.class';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'cf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
/**
 * shows user profile
 */
export class UserComponent implements OnInit {
  public user;

  constructor(private store: Store< GlobalState>, private userService: UserService) {  }

  ngOnInit() {
    this.store.select(s => s.userReducer).subscribe(d => this.user = d);
  }

}
