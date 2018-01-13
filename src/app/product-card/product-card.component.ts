import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart;

  constructor(private cartStorage: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartStorage.addToCart(this.product);
  }

  removeFromCart() {
    this.cartStorage.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
