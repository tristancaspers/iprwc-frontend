import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private cartStorage: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartStorage.getCart();
  }

  clearCart() {
    if (confirm("Are you sure you want to remove all items from your shopping cart?"))
    this.cartStorage.clearCart();
  }
}
