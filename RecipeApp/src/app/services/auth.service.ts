import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { LoginDetails } from '../interfaces/login-details';
import { RegisterDetails } from '../interfaces/register-details';
import { Router } from '@angular/router';

interface ResultData {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });

  private token: string = '';
  username: string = '';

  /**
   * loggedIn$ is an observable: boolean
   * return the latest value
   */
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = // 'http://127.0.0.1:8000/api/';
    'https://u06-fullstack-recipe-app-lloydelery-2.onrender.com/api/';
  /**
   * Handle information
   */

  userInfo: User | null = null;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {} // Injected http client

  // Hämtar boolean värdet för att guarden kräver det.
  // Vanligtvis vill vi koppla till våra streams, dock har vi inte fått det att fungera ännu
  getLoginStatus() {
    sessionStorage.getItem('token');
    return this.loggedIn.value.loginState;
  }

  // Uppdaterar boolean som för att se om användaren är inloggad eller ej.
  private updateLoginState(loginState: LoggedInUser) {
    this.loggedIn.next(loginState);
  }

  registerUser(registerDetails: RegisterDetails): Observable<ResultData> {
    return this.http
      .post<ResultData>(
        this.baseUrl + 'register',
        registerDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  /**
   * User Login | interface/login-details.ts
   * @param loginDetails
   * post-request <token> + url + loginDetails = body
   * .pipe for error handeling
   * .subscribe to get the request result
   */
  loginUser(loginDetails: LoginDetails) {
    this.http
      .post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        this.userInfo = result.user;

        sessionStorage.setItem('token', result.token); // saves the user token in the local storage

        sessionStorage.setItem('user', JSON.stringify(result.user));

        this.updateLoginState({
          user: result.user,
          loginState: true,
        });

        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
        this.router.navigate(['/profile']);
      });
  }

  getUserToken(): string | null {
    return this.token;
  }

  setUsername(name: string) {
    return (this.username = name);
  }

  logoutUser() {
    this.updateLoginState({
      user: undefined,
      loginState: false,
    });
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer '
    );
    sessionStorage.clear();
  }

  getCurrentUser() {
    let user: User;

    user = {
      id: 0,
      name: '',
      email: '',
    };

    this.http
      .get<User[]>(
        this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id,
        this.httpOptions
      )
      .subscribe((res) => (user = res[0]));
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
