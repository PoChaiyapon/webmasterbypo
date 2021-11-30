import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@models/index';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  // public user: any = null;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(Username, Password) {
    return this.http.post<User>(`${environment.apiUrl}/user/authenticate`, {Username, Password})
      .pipe(map(user => {
        localStorage.setItem('token', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}