import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../orders/order.model";


@Pipe({ name: 'searchOrder' })
export class SearchOrder implements PipeTransform {
  transform(orders: Order[], searchText: string) {
    if (!orders) return null;
    if(!searchText)  return orders;
    searchText = searchText.toLowerCase();
    return orders.filter(item =>  JSON.stringify(item).toLowerCase().includes(searchText));

  }
}
