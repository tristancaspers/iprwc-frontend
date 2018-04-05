import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import {ShoppingCartModel} from "../shared/models/shopping-cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public cart: ShoppingCartModel;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router) {}

  ngOnInit() {
    this.cart = this.cartService.getAuthenticatorCart();
  }

  removeProducts() {
    this.cartService.deleteCart();
  }

  checkout() {
    this.removeProducts();
    this.router.navigate(['order']);
  }

  calculate() {
    let totalPrice: number;
    for (let p of this.cart.products) {
      console.log(p.price);
      totalPrice = totalPrice + p.price.valueOf();
      console.log(totalPrice);
    } return totalPrice;
  }
}
