import {Component, OnInit} from '@angular/core';
import {Order} from "../order.model";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs";

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


  constructor(private orderService: OrderService) {

  }

  reload(){
    this.orderService.reloadOrder.subscribe(res => {
      this.getOrders();
    });
  }

  onSelect(selectedItem: Order) {
    console.log("Selected item Id: ", selectedItem.Order_ID)
    let orderObs: Observable<any>;
    orderObs = this.orderService.deleteOrder(selectedItem.Order_ID);
    orderObs.subscribe(
      resData => {
        console.log(resData);
        this.showSuccess = true;
        this.showError = false;
        this.success = "Order ID" + selectedItem.Order_ID + " deleted";
        this.orderService.getOrders().subscribe(
          result => {
            this.orders = result;
          });
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showSuccess = false;
        this.showError = true;
      }
    );

  }

    getOrders(): void{
      this.orderService.getOrders().subscribe(
        result => {
          this.orders = result;
        });

    }

    ngOnInit(): void {
      this.orderService.reloadOrder.subscribe(res => {
        if(res) {
          this.getOrders();
        }
      });
      this.getOrders();
  }
}
