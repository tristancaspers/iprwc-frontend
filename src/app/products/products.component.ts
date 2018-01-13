import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/product";
import "rxjs/add/operator/switchMap";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: any;
  sub: Subscription;

  constructor(
    productStorage: ProductService,
    private cartStorage: ShoppingCartService,
    route: ActivatedRoute) {
    productStorage.getAll().switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get("category");
        this.filterProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
  }

  async ngOnInit() {
    this.sub = (await this.cartStorage.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
