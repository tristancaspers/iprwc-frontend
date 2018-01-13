import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs/Subscription";
import {Product} from "../../models/product";
import {DataTableResource} from "angular-4-data-table";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  sub: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productStorage: ProductService) {
    this.sub = this.productStorage.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0}).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if(!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    let filterProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filterProducts);
  }
}
