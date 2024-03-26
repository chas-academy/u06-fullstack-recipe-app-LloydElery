import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { RegisterDetails } from '../interfaces/register-details';

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

  loggedIn$ = this.loggedIn.asObservable(); // En observable som är kopplad till loggedIn subjektet (denna kommer alltid att ha det senaste värdet)

  private baseUrl = 'http://127.0.0.1:8000/api/'; // Denna kommer ändras när vi deployar

  /**
   * Handle information
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {} // Injected http client

  // Hämtar boolean värdet för att guarden kräver det.
  // Vanligtvis vill vi koppla till våra streams, dock har vi inte fått det att fungera ännu
  getLoginStatus() {
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
      .post<ResultData>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);

        this.updateLoginState({
          user: result.user,
          loginState: true,
        });

        // localStorage.setItem("token", result.token); // saves the token in the local storage
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
      });
  }

  logoutUser() {
    this.http
      .post<ResultData>(this.baseUrl + 'login', {}, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: false,
        });
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer '
        );
      });
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

  // Only gets user11
  getUser11(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getuser/11', this.httpOptions);
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
