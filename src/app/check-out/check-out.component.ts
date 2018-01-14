import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Subscription} from "rxjs/Subscription";
import {OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Order} from "../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  cartSub: Subscription;
  userSub: Subscription;
  userId: string;

  constructor(private cartStorage: ShoppingCartService, private orderStorage: OrderService, private auth: AuthService, private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.cartStorage.getCart();
    this.cartSub = cart$.subscribe(cart => this.cart = cart);
    this.userSub = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderStorage.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
