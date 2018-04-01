import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import {ShoppingCartModel} from "../shared/models/shopping-cart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public cart: ShoppingCartModel;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.cart = this.cartService.getAuthenticatorCart();
  }

  checkout() {
    this.cartService.deleteCart();
  }
}
