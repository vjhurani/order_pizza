import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {DisplayMessageModel} from "./display-message.model";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit, OnDestroy {
  showChildSuccess: boolean= false;
  showChildError: boolean= false;
  errorChild: string = ""
  successChild: string = "Success"

  constructor(private orderService : OrderService) {
  }

  ngOnInit(): void {
    this.orderService.display_message.subscribe((notification: DisplayMessageModel)=>{

        this.showChildError = notification.showError;
        this.showChildSuccess = notification.showSuccess;
        this.successChild = notification.success;
        this.errorChild = notification.error;
        this.fadeOut();

    },);


  }

  ngOnDestroy(): void {
    this.orderService.display_message.unsubscribe();

  }

  fadeOut() {
    setTimeout( () => {
      this.showChildError = false;
      this.showChildSuccess = false;
    }, 4000);
  }
}
