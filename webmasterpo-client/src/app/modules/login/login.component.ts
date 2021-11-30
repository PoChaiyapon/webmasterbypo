import { Component, OnInit, OnDestroy, Renderer2, HostBinding } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '@services/index';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'login-box';
  public loginForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.loginForm = new FormGroup({
      Username: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required)
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginByAuth() {
    this.isSubmitted = true;

    //if form login valid
    if(this.loginForm.valid) {
      this.isLoading = true;
      this.accountService.login(this.f.Username.value, this.f.Password.value)
        .pipe(first())
        .subscribe({
          next: ()=> {
            // get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
            // this.router.navigate(['/']);
          },
          error: err => {
            this.toastr.error(err);
            this.isLoading = false;
          }
        });
    } else {
      this.toastr.error('Form is not valid!');
    }
  }
}
