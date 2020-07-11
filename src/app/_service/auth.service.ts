import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  errorData: {};
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  // serverUrl = 'https://zen-user-api.herokuapp.com/users/'
  serverUrl ='https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/Users';
  register(user: User) {
    console.log(user);
    return this.http.post(`${this.serverUrl}`, user);
  }
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}authenticate`, { email: email, password: password })
      .pipe(map(user => {
          console.log(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
      }),
        catchError(this.handleError)
      );
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}


