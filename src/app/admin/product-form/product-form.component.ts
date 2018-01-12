import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    private categoryStorage: CategoryService,
    private productStorage: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryStorage.getCategories();
    let id = this.route.snapshot.paramMap.get("id");
    if (id) this.productStorage.get(id).take(1).subscribe(p => this.product = p);
  }

  ngOnInit() {
  }

  save(product) {
    this.productStorage.create(product);
    this.router.navigate(["/admin/products"]);
  }
}
