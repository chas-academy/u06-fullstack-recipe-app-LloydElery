import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoggedInUser } from './interfaces/logged-in-user';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeApp';

  loggedIn$: Observable<LoggedInUser>; // Listens to changes in auth login. Conected to the loggedIn service

  constructor(private auth: AuthService) {
    this.loggedIn$ = this.auth.loggedIn$;
  }

  dataSave() {
    sessionStorage.setItem('name', 'Dennis');
    sessionStorage.setItem('age', '34');
  }

  get() {
    return sessionStorage.getItem('name'), sessionStorage.getItem('age');
  }

  dataRemove() {
    sessionStorage.removeItem('name');
  }

  dataDeleteAll() {
    sessionStorage.clear();
  }
}
