import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }

  logout() {
    this.accountService.logout();
  }

  formatDate(date) {
    return DateTime.fromISO(date).toFormat('dd LLL yyyy');
  }

}
