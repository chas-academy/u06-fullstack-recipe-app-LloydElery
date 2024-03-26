import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDetails: LoginDetails;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'placeholder@place.holder',
      password: 'placeholder',
    };
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }

  register() {
    //TODO Method for handeling user registration
  }
}
