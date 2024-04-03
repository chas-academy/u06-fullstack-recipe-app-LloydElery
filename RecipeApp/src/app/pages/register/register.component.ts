import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterDetails } from '../../interfaces/register-details';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
  });

  password = this.registerForm.value.password;
  password_confirmation = this.registerForm.value.password_confirmation;

  register() {
    console.log('register-method');
    const registerData = this.registerForm.value;
    console.log('...');
    console.log(registerData);
    this.auth
      .registerUser(registerData as RegisterDetails)
      .subscribe((result) => {
        console.log('Success', result);
      });
  }
}
