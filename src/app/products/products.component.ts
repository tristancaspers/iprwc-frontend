import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/product";
import "rxjs/add/operator/switchMap";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ShoppingCart} from "../models/shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productStorage: ProductService, private cartStorage: ShoppingCartService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.cart$ = await this.cartStorage.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productStorage.getAll().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;}).subscribe(params => {
      this.category = params.get("category");
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filterProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
