import {Component, Input} from '@angular/core';
import {ProductModel} from "../../shared/models/product";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ShoppingCartModel} from "../../shared/models/shopping-cart";
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input("product") product: ProductModel;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart;

  cartModel: ShoppingCartModel = new ShoppingCartModel();

  constructor(private cartService: ShoppingCartService) { }


  addToCart(product: ProductModel) {
    let cartModel = this.cartService.getAuthenticatorCart();
    if (!cartModel.id) {
      this.cartModel.id = Math.random();
      this.cartModel.products = [];
      this.cartModel.products.push(product);
      product.quantity = 1;

      this.cartService.storeAuthorizationCart(this.cartModel);
      this.cartModel = this.cartService.getAuthenticatorCart();

    } else {
      this.cartModel = this.cartService.getAuthenticatorCart();
      product.quantity = 1;

      if (this.cartModel.products.some(x => x.id === product.id)) {
        let model: ProductModel = <ProductModel>this.cartModel.products.find(x => x.id === product.id);
        model.quantity = model.quantity + 1;
      } else {
        this.cartModel.products.push(this.product);
      }
      this.cartService.storeAuthorizationCart(this.cartModel);
    }
    swal({
      title: product.title,
      text: 'is now in your shopping cart!',
      type: 'success',
      confirmButtonText: 'OK'}).then(() => window.location.reload());
  }

  getCartId(): number {
    let model = this.cartService.getAuthenticatorCart();
    if (!model.id) {
      return model.id;
    } return model.id = Math.random() ? model.id : new ShoppingCartModel().id;
  }

  getQuantity() {
    if (!this.cartModel) {
      return 0;
    }
    this.cartModel.products = [];
    let item = this.cartModel.products[this.product.id];
    return item ? item.quantity : 0;
  }
}
