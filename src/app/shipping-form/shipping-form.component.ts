import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {Subscription} from "rxjs/Subscription";
import {OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping = {};
  userSub: Subscription;
  userId: string;

  constructor(private orderStorage: OrderService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderStorage.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
