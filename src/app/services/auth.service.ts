import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';

import {AuthResponse} from "../auth/auth-response.model";
import {AuthRequest} from "../auth/auth-request.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authResponse = new BehaviorSubject<AuthResponse>(null);

  private authUrl = 'https://pizza-api-app.herokuapp.com/api/auth';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient){}



  authenticateUser(authData:AuthRequest): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(authData);
    console.log(body)
    return this.http.post<AuthResponse>(this.authUrl , body,{'headers':headers})
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.access_token
          );
        })
      );;
  }

  logout() {
    this.authResponse.next(null)
  }

  private handleAuthentication(
    access_token: string
  ) {

    const expDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
    const nextAuthResponse = new AuthResponse(access_token,expDate);
    this.authResponse.next(nextAuthResponse);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorMessage);
  }

}
