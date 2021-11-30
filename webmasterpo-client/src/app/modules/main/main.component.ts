import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @HostBinding('class') class = 'wrapper';
  public sidebarMenuOpened = true;

  constructor(private renderer: Renderer2, private accountService: AccountService) { }

  ngOnInit(): void {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }

  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'sidebar-open'
      );
      this.renderer.addClass(
          document.querySelector('app-root'),
          'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
          document.querySelector('app-root'),
          'sidebar-collapse'
      );
      this.renderer.addClass(
          document.querySelector('app-root'),
          'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }

}
