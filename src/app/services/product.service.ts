import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ProductModel} from "../models/product";

@Injectable()
export class ProductService {

  constructor(
    private api: ApiService) {}

  getAll() {
    return this.api.get("products");
  }

  getById(id) {
    return this.api.get("products/" + id);
  }

  create(model: ProductModel) {
    this.api.post("products/", model);
  }

  update(id, model) {
    return this.api.put("products/" + <string>id, model);
  }

  delete(id) {
    return this.api.delete("products/" + <string>id);
  }
}
