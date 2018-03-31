import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Observable} from "rxjs/Observable";
import {ShoppingCartModel} from "../models/shopping-cart";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  // cart$: Observable<ShoppingCartModel>;

  constructor(private cartStorage: ShoppingCartService) { }

  ngOnInit() {
    // this.cart$ = await this.cartStorage.getAuthenticatorCart();
  }
}
