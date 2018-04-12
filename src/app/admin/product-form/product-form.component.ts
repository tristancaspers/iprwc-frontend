import { Component } from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/take";
import {Observable} from "rxjs/Observable";
import {ProductModel} from "../../shared/models/product";
import swal from "sweetalert2";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  products$: Observable<ProductModel>;
  product: ProductModel = new ProductModel();
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
    }
    this.router.navigate(['/admin/products']);
    window.location.reload();
  }

  delete() {
    swal({
      title: this.product.title,
      text: 'are you sure to delete this?',
      type: 'question',
      showCancelButton: true,
      cancelButtonText: "NO",
      confirmButtonText: "YES"}).then(() => {
      this.productService.delete(this.id);
      this.router.navigate(["/admin/products"]);
      window.location.reload();
    });
  }
}
