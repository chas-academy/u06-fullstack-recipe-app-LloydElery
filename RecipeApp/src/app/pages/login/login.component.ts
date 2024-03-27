import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { LoggedInUser } from '../../interfaces/logged-in-user';
import { RegisterDetails } from '../../interfaces/register-details';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    console.log('login-method');
    const loginData = this.loginForm.value;
    console.log(loginData);
    this.auth.loginUser(loginData as LoginDetails);
    console.log('You are now logged in!');
  }
}
