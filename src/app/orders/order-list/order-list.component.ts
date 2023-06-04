import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../order.model";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs";
import {DisplayMessageModel} from "../../display-message/display-message.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit
{
  searchData: string =""
  showError = false;
  showSuccess = false
  success : string = ""
  error: string = null;
  orders: Order[] = [
    new Order('Thin', 'Spicy', 123, 'small',100,'100000'),
    new Order('Cheese', 'Hot', 456,'large',200,'100000'),
  ];

  serviceCalledExternally : boolean = false;
  constructor(private orderService: OrderService) {

  }


  onSelect(selectedItem: Order) {
    console.log("Selected item Id: ", selectedItem.Order_ID)
    let orderObs: Observable<any>;
    orderObs = this.orderService.deleteOrder(selectedItem.Order_ID);
    orderObs.subscribe(
      resData => {
        const notification = new DisplayMessageModel(true, ("Order ID " + selectedItem.Order_ID + " deleted"),false,"","delete");
        this.orderService.display_message.next(notification);
        this.orderService.getOrders().subscribe(
          result => {
            this.orders = result;
          });
      },
      errorMessage => {
        console.log(errorMessage);
        const notification = new DisplayMessageModel(false, "",true,errorMessage,"delete");
        this.orderService.display_message.next(notification);
      }
    );

  }


    ngOnInit(): void {
      this.orderService.reloadOrder.subscribe(res => {
        if(res) {
          console.log('inside from reloadOrder')
          this.serviceCalledExternally = true;
          this.orderService.getOrders().subscribe(
            result => {
              this.orders = result;
            });
        }
        else{
          this.serviceCalledExternally = false;
        }
      });
      if(!this.serviceCalledExternally){
        console.log('inside from inital')
        this.orderService.getOrders().subscribe(
          result => {
            this.orders = result;
          });
      }

  }
}
