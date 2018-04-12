import {Component} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ProductModel} from "../../shared/models/product";
import {DataTableResource} from "angular5-data-table";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {

  products: ProductModel[];
  tableResource: DataTableResource<ProductModel>;
  items: ProductModel[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(response => {
      this.products = response;
      this.initTable(response);
    });
  }

  private initTable(products: ProductModel[]) {
    this.tableResource = new DataTableResource<ProductModel>(products);
    this.tableResource.query({offset: 0})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.initTable(filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    } this.tableResource.query(params).then(items => this.items = items);
  }
}
