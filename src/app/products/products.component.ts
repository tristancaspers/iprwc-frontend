import {Component, Input} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {ProductModel} from "../shared/models/product";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<ProductModel>;

  @Input("show-actions") showActions = true;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }
}
