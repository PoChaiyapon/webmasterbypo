import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '@services/index'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public searchForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    });
  }

  logout() {
    this.accountService.logout();
  }

}
