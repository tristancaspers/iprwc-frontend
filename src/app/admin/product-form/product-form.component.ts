import { Component } from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {ProductModel} from "../../shared/models/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  products$: Observable<ProductModel>;
  product: ProductModel;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.products$ = productService.getAll();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.productService.getById(this.id).subscribe(p => {this.product = p;});
    }
  }

  update(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
      console.log(product);
    }
    console.log(product);
    this.router.navigate(['admin/products']);
  }

  delete() {
    if (confirm("Wil je het product verwijderen?")) {
      this.productService.delete(this.id);
    }
    this.router.navigate(["admin/products"]);
  }
}
