import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeApp';

  loginDetails: LoginDetails;

  user: User;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'den@den.den',
      password: 'dendenden',
    };

    this.user = {
      id: 1,
      name: 'Dennis',
      email: '',
    };

    auth.loginUser(this.loginDetails);
  }

  getUser() {
    this.auth.getUser2().subscribe((res) => {
      console.log(res[0]); // Tar ut det första elementet ur arrayen
      this.user = res[0];
    });
  }
}
