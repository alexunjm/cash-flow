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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getProfile().user;
  }

}
