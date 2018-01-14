import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {OrderService} from "../services/order.service";
import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(private auth: AuthService, private orderStorage: OrderService) {
    this.orders$ = auth.user$.switchMap(u => this.orderStorage.getOrdersByUser(u.uid));
  }

  ngOnInit() {
  }
}
