import {Component, OnDestroy, OnInit} from '@angular/core';

import {OrderService} from "../../services/order.service";
import {Order} from "../order.model";
import {NgForm} from "@angular/forms";
import {AuthRequest} from "../../auth/auth-request.model";
import {Observable} from "rxjs";
import {AuthResponse} from "../../auth/auth-response.model";
import {DisplayMessageModel} from "../../display-message/display-message.model";

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent {

  orderData = {} as Order;
  showError = false;
  showSuccess = false
  error: string = null;
  success: string = null;
  constructor(private orderService: OrderService) { }


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
        const notification = new DisplayMessageModel(true, ("Order ID " + resData.Order_ID + " added"),false,"","add");
        this.orderService.display_message.next(notification);
        this.orderService.reloadOrder.next(true);

      },
      errorMessage => {
        console.log(errorMessage);
        const notification = new DisplayMessageModel(false, "",true,errorMessage,"add");
        this.orderService.display_message.next(notification);
      }
    );
    orderForm.reset();
  }



}
