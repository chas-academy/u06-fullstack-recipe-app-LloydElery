import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../interfaces/logged-in-user';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loggedIn$: Observable<LoggedInUser>; // Listens to changes in auth login. Conected to the loggedIn service

  constructor(private auth: AuthService, private router: Router) {
    this.loggedIn$ = this.auth.loggedIn$;
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const loginData = this.loginForm.value;
    this.auth.loginUser(loginData as LoginDetails);
  }

  /*   reRoute(route: string) {
    if (this.loggedIn$) {
      this.router.navigate([route]);
    }
  } */

  logOut() {
    this.auth.logoutUser();
  }
}
