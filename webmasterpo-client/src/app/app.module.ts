import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// used to create fake backend
import { ErrorInterceptor,JwtInterceptor } from "./helpers";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';

// main layou
import { MainComponent } from './modules/main/main.component';
import { FooterComponent } from './modules/main/footer/footer.component';
import { HeaderComponent } from './modules/main/header/header.component';
import { MenuSidebarComponent } from './modules/main/menu-sidebar/menu-sidebar.component';
import { UserComponent } from './modules/main/header/user/user.component';
import { LanguageComponent } from './modules/main/header/language/language.component';
import { MessagesComponent } from './modules/main/header/messages/messages.component';
import { NotificationsComponent } from './modules/main/header/notifications/notifications.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownMenuComponent } from './components/dropdown/dropdown-menu/dropdown-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BlankComponent } from './pages/blank/blank.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MenuSidebarComponent,
    UserComponent,
    LanguageComponent,
    MessagesComponent,
    NotificationsComponent,
    DropdownComponent,
    ButtonComponent,
    MenuItemComponent,
    DropdownMenuComponent,
    DashboardComponent,
    ProfileComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
