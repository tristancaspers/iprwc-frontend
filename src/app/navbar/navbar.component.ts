import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: User;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private cartStorage: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartStorage.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
