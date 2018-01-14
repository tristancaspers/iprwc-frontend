import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCartService} from "../services/shopping-cart.service";

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input("product") product: Product;
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
}
