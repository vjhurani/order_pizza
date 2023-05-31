import {Component, OnInit} from '@angular/core';

import {OrderService} from "../../services/order.service";
import {Order} from "../order.model";
import {NgForm} from "@angular/forms";
import {AuthRequest} from "../../auth/auth-request.model";
import {Observable} from "rxjs";
import {AuthResponse} from "../../auth/auth-response.model";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  orderData = {} as Order;
  showError = false;
  showSuccess = false
  error: string = null;
  success: string = null;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  initializeOrderData() {
    this.orderData = {} as Order;
  }

  onSubmit(orderForm: NgForm){
    if(!orderForm.valid) {
      return;
    }
    let orderObs: Observable<Order>;
    orderObs = this.orderService.addOrder(this.orderData);

    orderObs.subscribe(
      resData => {
        console.log(resData);
        this.showSuccess = true;
        this.showError = false;
        this.success = "Order ID " + resData.Order_ID + " added";
        this.orderService.reloadOrder.next(true);

      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showSuccess = false;
        this.showError = true;
      }
    );
    orderForm.reset();
  }



}
