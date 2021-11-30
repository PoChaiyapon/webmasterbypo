import { Component, OnInit } from '@angular/core';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  public user;
  public menu = MENU;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }

}

export const MENU = [
  {
    name: 'Dashboard',
    path: ['/']
  },
  {
    name: 'Blank',
    path: ['/blank']
  },
  {
    name: 'Main Menu',
    children: [
      {
        name: 'Sub Menu',
        path: ['/sub-menu-1']
      },
      {
        name: 'Blank',
        path: ['/sub-menu-2']
      }
    ]
  }
]
