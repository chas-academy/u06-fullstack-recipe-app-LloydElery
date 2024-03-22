import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

interface ResultData {
  token: string;
}

interface RegisterDetails {}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

  /**
   * Handle information
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {} // Injected http client

  getLoginStatus() {
    return this.loggedIn.value;
  }

  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
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
        this.updateLoginState(true);
        // localStorage.setItem("token", result.token); // saves the token in the local storage
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
      });
  }

  logOut() {
    this.http
      .post<ResultData>(this.baseUrl + 'login', {}, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer '
        );
      });
  }

  // Only gets user2
  getUser2(): Observable<User[]> {
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
