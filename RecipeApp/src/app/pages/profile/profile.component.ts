import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: User;

  constructor(private auth: AuthService) {
    this.user = {
      id: -1,
      name: '',
      email: '',
    };
  }
}
