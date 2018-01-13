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

  constructor(private cartStorage: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cartStorage.addToCart(product);
  }
}
