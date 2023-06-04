import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Order} from "../orders/order.model";
import {AuthRequest} from "../auth/auth-request.model";
import {AuthResponse} from "../auth/auth-response.model";
import {DisplayMessageModel} from "../display-message/display-message.model";


@Injectable({ providedIn: 'root' })
export class OrderService {

  private orderUrl = 'https://pizza-api-app.herokuapp.com/api/orders';  // URL to web api
  reloadOrder = new Subject<boolean>();
  display_message = new Subject<DisplayMessageModel>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient){}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl)
      .pipe(
        catchError(this.handleError),
      );
  }

  deleteOrder(orderId : number): Observable<any> {
    return this.http.delete(this.orderUrl + "/" + orderId)
      .pipe(
        catchError(this.handleError),
      );
  }


  addOrder(order:Order): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(order);
    console.log(body)
    return this.http.post<AuthResponse>(this.orderUrl , order)
      .pipe(
        catchError(this.handleError),
      );;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    return throwError(errorMessage);
  }


}
