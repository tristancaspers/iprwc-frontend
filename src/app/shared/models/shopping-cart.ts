import {ProductModel} from "./product";

export class ShoppingCartModel {
  constructor(
    public id?: number,
    public products?: ProductModel[]
  ) {}
}
