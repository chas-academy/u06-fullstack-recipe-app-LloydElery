import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { LoginComponent } from '../login/login.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoginComponent, TitleCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService) {
    this.user = {
      id: -1,
      email: '',
      name: '',
    };
    this.user.name = this.auth.username;
  }

  username: any;

  ngOnInit(): void {
    this.username = this.auth.userInfo;
    let user: User = {
      id: this.user?.id,
      email: this.user?.email,
      name: this.user?.name,
    };
    this.user = user;
  }
}
