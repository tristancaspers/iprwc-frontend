import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryStorage: CategoryService, private productStorage: ProductService) {
    this.categories$ = categoryStorage.getCategories();
  }

  ngOnInit() {
  }

  save(product) {
    this.productStorage.create(product);
  }
}
