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
  loginDetails: LoginDetails;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: '',
      password: '',
    };
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    return this.loginForm.value.email;
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }
}
