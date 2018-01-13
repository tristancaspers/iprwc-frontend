import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input("category") category;

  constructor(categoryStorage: CategoryService) {
    this.categories$ = categoryStorage.getAll();
  }

  ngOnInit() {
  }
}
