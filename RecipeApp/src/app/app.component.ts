import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LoginFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeApp';

  loginDetails: LoginDetails; // Startvalue for login details

  user: User;

  loggedIn$: Observable<boolean>; // Listens to changes in auth login. Conected to the loggedIn service

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'den@den.den',
      password: 'dennis',
    };

    this.user = {
      id: -1,
      name: '',
      email: '',
    };

    this.loggedIn$ = this.auth.loggedIn$;
  }

  getUser() {
    this.auth.getUser2().subscribe((res) => {
      this.user = res[0];
    });
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }

  logout() {
    this.auth.logOut();
  }
}
