import { Injectable } from '@angular/core';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import {Router} from "@angular/router";
import {ShoppingCartModel} from "../models/shopping-cart";

@Injectable()
export class ShoppingCartService {

  private authenticatorCart: ShoppingCartModel = null;

  constructor(private router: Router) {}

  public storeAuthorizationCart(authenticatorCart: ShoppingCartModel): void {
    this.authenticatorCart = authenticatorCart;

    const authorizationCartString = JSON.stringify(this.authenticatorCart);
    const storage = localStorage;

    storage.setItem('authorizationCart', authorizationCartString);
  }

  public restoreAuthenticatorCart(): void {
    let authenticatorCartString = sessionStorage.getItem('authorizationCart');

    if (authenticatorCartString  === null) {
      authenticatorCartString  = localStorage.getItem('authorizationCart');
    }

    if (authenticatorCartString  !== null) {
      let authorizationCartModel: ShoppingCartModel = JSON.parse(authenticatorCartString);
      this.authenticatorCart = authorizationCartModel;
    } else {
      this.authenticatorCart = new ShoppingCartModel();
    }
  }

  public getAuthenticatorCart(): ShoppingCartModel {
    this.restoreAuthenticatorCart();
    return this.authenticatorCart;
  }

  deleteCart() {
    this.authenticatorCart = null;
    sessionStorage.removeItem('authorizationCart');
    localStorage.removeItem('authorizationCart');
    this.router.navigate(['']);
  }
}
