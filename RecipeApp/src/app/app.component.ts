import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { LoggedInUser } from './interfaces/logged-in-user';
import { LoginComponent } from './pages/login/login.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

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
    NgOptimizedImage,
    RecipesComponent,
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

  ngOnInit(boolean: Boolean) {
    boolean = false;
    if (this.loggedIn$) {
      boolean = true;
      let userToken = sessionStorage.getItem('token');
      console.log(userToken);
    }
  }
}
